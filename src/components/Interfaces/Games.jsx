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
import GameCard from '../Games/Card';
import GameStatus from '../Games/Status';
import CreateGame from '../Games/actions/Create';
import EditGame from '../Games/actions/Edit';
import DeleteGame from '../Games/actions/Delete';
import Modal from '../UI/Modal';
import { useUserGames, useGameStats } from '../../hooks/games';
import { codeDate } from '../../utils/gamesHelpers';
import { gamesPerKid } from '../../utils/globals';

const propTypes = {
  useCustomAppBar: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
  whoAmI: PropTypes.object,
  setWhoAmI: PropTypes.func
};

const defaultProps = {
  whoAmI: null,
  setWhoAmI: () => {}
};

const GamesInterface = ({ useCustomAppBar, width, whoAmI, setWhoAmI }) => {
  const userGames = useUserGames();
  const [games, setGames] = useState([]);
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

  // Filter games if whoAmI is set.
  useEffect(() => {
    if (whoAmI !== null) setGames(userGames.filter(g => g.child.path === whoAmI.ref.path));
    else setGames(userGames);
  }, [userGames, whoAmI]);

  // Add a "New Game" button to app bar.
  useEffect(() => {
    const disabled = games.length >= gamesPerKid;
    const onClick = () => {
      if (games.length < gamesPerKid) updateToggles({ showCreate: true });
    };
    let action = (
      <Button
        aria-label="New Game"
        color="primary"
        variant="contained"
        startIcon={<Add />}
        disabled={disabled}
        onClick={onClick}
      >
        New Game
      </Button>
    );
    if (isWidthDown('xs', width)) {
      action = (
        <Tooltip
          title="New Game"
          placement="bottom"
          disableFocusListener={disabled}
          disableHoverListener={disabled}
          disableTouchListener={disabled}
        >
          <span>
            <IconButton
              aria-label="New Game"
              color="secondary"
              disabled={disabled}
              onClick={onClick}
            >
              <Add />
            </IconButton>
          </span>
        </Tooltip>
      );
    }
    const contentProps = { whoAmI, setWhoAmI };
    useCustomAppBar({
      title: 'Games',
      action,
      wrap: true,
      content: <WhoAmIButton {...contentProps} className={classes.profButton} />,
      wrappedContent: <WhoAmIButton {...contentProps} listButton />
    });
  }, [games, updateToggles, width, whoAmI]);

  const getInterface = () => {
    const { showCreate, editGame, deleteGame, showGame } = toggles;
    if (showCreate) {
      return <CreateGame onClose={() => updateToggles({ showCreate: false })} child={whoAmI} />;
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
    <>
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
    </>
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
  },
  profButton: { marginRight: 20 }
});

export default withWidth()(GamesInterface);
