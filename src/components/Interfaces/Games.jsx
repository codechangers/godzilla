import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Add } from '@material-ui/icons';
import WhoAmIButton from './interfaceHelpers/WhoAmIButton';
import GameCard from '../Games/GameCard';
import GameStatus from '../Games/GameStatus';
import CreateGame from '../Games/actions/CreateGame';
import EditGame from '../Games/actions/EditGame';
import DeleteGame from '../Games/actions/DeleteGame';
import Modal from '../UI/Modal';
import { useUserGames, useGameStats } from '../../hooks/games';
import { codeDate } from '../../utils/gamesHelpers';
import { gamesPerKid } from '../../utils/globals';
import * as Styled from './styles';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func
};

const defaultProps = {
  whoAmI: null,
  setWhoAmI: () => {}
};

const GamesInterface = ({ useCustomAppBar, accounts, width, whoAmI, setWhoAmI }) => {
  const games = useUserGames();
  const stats = useGameStats(games);
  const [toggles, setToggles] = useState({
    showCreate: false,
    editGame: null,
    deleteGame: null,
    showGame: null
  });
  const updateToggles = useCallback(update => setToggles({ ...toggles, ...update }), [toggles]);

  const gameWithStats = game => {
    const gameStats = stats.filter(s => s.id === game.id);
    return gameStats.length > 0 ? { ...gameStats[0], ...game } : game;
  };

  // Add a "New Game" button to app bar.
  useEffect(() => {
    const disabled = games.length >= gamesPerKid;
    const onClick = () => {
      if (games.length < gamesPerKid) updateToggles({ showCreate: true });
    };
    let action = (
      <Button
        aria-label="New Game"
        variant="outlined"
        startIcon={<Add />}
        disabled={disabled}
        onClick={onClick}
      >
        New Game
      </Button>
    );
    if (isWidthDown('xs', width)) {
      action = (
        <Tooltip title="New Game" placement="bottom">
          <IconButton aria-label="New Game" color="secondary" disabled={disabled} onClick={onClick}>
            <Add />
          </IconButton>
        </Tooltip>
      );
    }
    useCustomAppBar({
      title: 'Games',
      action,
      content: <WhoAmIButton whoAmI={whoAmI} setWhoAmI={setWhoAmI} accounts={accounts} />
    });
  }, [games, updateToggles, width, whoAmI, accounts]);

  const getInterface = () => {
    const { showCreate, editGame, deleteGame, showGame } = toggles;
    if (showCreate) {
      return <CreateGame onClose={() => updateToggles({ showCreate: false })} />;
    }
    if (editGame) {
      return <EditGame onClose={() => updateToggles({ editGame: null })} game={editGame} />;
    }
    if (deleteGame) {
      return <DeleteGame onClose={() => updateToggles({ deleteGame: null })} game={deleteGame} />;
    }
    if (showGame) {
      return (
        <GameStatus
          onClose={() => updateToggles({ showGame: null })}
          gameId={showGame.id}
          games={games.map(g => gameWithStats(g))}
        />
      );
    }
    return <div />;
  };

  const classes = useStyles();
  return (
    <Styled.PageContent>
      <Container maxWidth="md" className={classes.content}>
        <Grid container direction="row" justify="flex-start" align="center" spacing={3}>
          {games.length === 0 ? (
            <Grid item xs={12} className={classes.blank}>
              <Typography variant="h4" color="textPrimary" align="left">
                You don&apos;t have any games yet
              </Typography>
              <Typography variant="h6" color="textSecondary" align="left" style={{ marginTop: 10 }}>
                Create one now to play online with your friends!
              </Typography>
            </Grid>
          ) : (
            <Grid item xs={12} className={classes.blank}>
              <Typography variant="body1" color="textSecondary" align="left">
                <strong>Note:</strong> Your game will be deleted approximately 2 weeks after the end
                of your competition.
              </Typography>
            </Grid>
          )}
          {games
            .sort((a, b) => codeDate(b.code) - codeDate(a.code))
            .map(game => (
              <Grid item xs={12} md={6} key={game.id}>
                <GameCard game={gameWithStats(game)} updateToggles={updateToggles} />
              </Grid>
            ))}
        </Grid>
      </Container>
      <Modal
        open={
          toggles.showCreate ||
          toggles.editGame !== null ||
          toggles.deleteGame !== null ||
          toggles.showGame !== null
        }
        onClose={() =>
          setToggles({
            showCreate: false,
            editGame: null,
            deleteGame: null,
            showGame: null
          })
        }
        title="Games Modal"
        description="Create, Update, and Delete games."
        noWrapper
      >
        {getInterface()}
      </Modal>
    </Styled.PageContent>
  );
};
GamesInterface.propTypes = propTypes;
GamesInterface.defaultProps = defaultProps;

const useStyles = makeStyles({
  content: {
    paddingTop: 40
  },
  blank: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: 10
  }
});

export default withWidth()(GamesInterface);
