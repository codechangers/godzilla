import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import GameForm from '../Form';
import StatusCard from '../StatusCard';
import { checkInput, uploadCode } from '../../../utils/gamesHelpers';
import { db } from '../../../utils/firebase';

const propTypes = {
  game: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
const defaultProps = {
  onClose: () => {}
};

const EditGame = forwardRef(({ game, onClose }, ref) => {
  const [errorMessage, setError] = useState('');
  const [toggles, setToggles] = useState({
    isLoading: false,
    didSucceed: false,
    didFail: false
  });
  const updateToggles = newToggles => setToggles({ ...toggles, ...newToggles });

  const updateGame = newGame => {
    const [valid, error] = checkInput(newGame);
    db.collection('games')
      .where('name', '==', newGame.name)
      .get()
      .then(duplicates => {
        if ((duplicates.empty || duplicates.docs[0].id === game.id) && valid) {
          updateToggles({ isLoading: true });
          const saveGame = code => {
            const { name, type, userID } = newGame;
            db.collection('games')
              .doc(newGame.id)
              .update({
                name,
                type,
                code,
                userID
              })
              .then(() => {
                updateToggles({ isLoading: false, didSucceed: true });
                setError('');
              })
              .catch(err => {
                console.error(err);
                setError('0|Failed to Update.');
              });
          };
          if (!newGame.code) {
            // TODO: Delete old_code file from storage
            uploadCode(
              newGame,
              fileRef => saveGame(fileRef.fullPath),
              () => {
                updateToggles({ isLoading: false, didFail: true });
                setError('Failed to Upload File.');
              }
            );
          } else {
            saveGame(newGame.code);
          }
        } else if (!duplicates.empty) {
          setError(`1|The name ${newGame.name} is not available.`);
        } else if (error) {
          setError(error);
        } else {
          setError('');
        }
      });
  };

  const getMessage = () => {
    const { isLoading, didSucceed, didFail } = toggles;
    if (isLoading) return 'Updating Game...';
    if (didSucceed) return 'Updated Game!';
    if (didFail) return errorMessage;
    return '';
  };

  if (toggles.isLoading || toggles.didSucceed || toggles.didFail) {
    return (
      <StatusCard
        message={getMessage()}
        succeeded={toggles.didSucceed}
        failed={toggles.didFail}
        onClose={onClose}
      />
    );
  }
  return (
    <GameForm
      ref={ref}
      title="Edit Game"
      error={errorMessage}
      onSubmit={updateGame}
      onCancel={onClose}
      game={{
        ...game,
        file: null
      }}
    />
  );
});

EditGame.propTypes = propTypes;
EditGame.defaultProps = defaultProps;

export default EditGame;
