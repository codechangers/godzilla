import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import GameForm from '../GameForm';
import StatusCard from '../StatusCard';
import { checkInput, uploadCode } from '../../../utils/gamesHelpers';
import { db, auth, Timestamp } from '../../../utils/firebase';
import { gamesPerKid } from '../../../utils/globals';

const propTypes = {
  onClose: PropTypes.func
};
const defaultProps = {
  onClose: () => {}
};

const CreateGame = forwardRef(({ onClose }, ref) => {
  const [errorMessage, setError] = useState('');
  const [toggles, setToggles] = useState({
    isLoading: false,
    didSucceed: false,
    didFail: false
  });
  const updateToggles = newToggles => setToggles({ ...toggles, ...newToggles });

  const createGame = newGame => {
    const [valid, error] = checkInput(newGame);
    db.collection('games')
      .where('name', '==', newGame.name)
      .get()
      .then(duplicates => {
        db.collection('games')
          .where('userID', '==', auth.currentUser.uid)
          .get()
          .then(snap => {
            if (duplicates.empty && valid && snap.size < gamesPerKid) {
              updateToggles({ isLoading: true });
              uploadCode(
                newGame,
                fileRef => {
                  const { name, type } = newGame;
                  db.collection('games')
                    .add({
                      name,
                      type,
                      code: fileRef.fullPath,
                      userID: auth.currentUser.uid,
                      createdAt: Timestamp.fromDate(new Date())
                    })
                    .then(() => {
                      updateToggles({ isLoading: false, didSucceed: true });
                      setError('');
                    })
                    .catch(err => {
                      console.error(err);
                      setError('Failed to Create Game.');
                      updateToggles({ isLoading: false, didFail: true });
                    });
                },
                () => {
                  updateToggles({ isLoading: false, didFail: true });
                  setError('Failed to Upload File.');
                }
              );
            } else if (snap.size >= gamesPerKid) {
              setError(
                `1|You may only create ${gamesPerKid} game${
                  gamesPerKid === 1 ? '' : 's'
                } at a time!`
              );
            } else if (!duplicates.empty) {
              setError(`1|The name ${newGame.name} is not available.`);
            } else if (error) {
              setError(error);
            } else {
              setError('');
            }
          });
      });
  };

  const getMessage = () => {
    const { isLoading, didSucceed, didFail } = toggles;
    if (isLoading) return 'Creating Game...';
    if (didSucceed) return 'Created Game!';
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
      title="Create a New Game"
      error={errorMessage}
      onSubmit={createGame}
      onCancel={onClose}
    />
  );
});

CreateGame.propTypes = propTypes;
CreateGame.defaultProps = defaultProps;

export default CreateGame;
