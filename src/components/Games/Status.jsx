import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';
import { Autorenew, CheckCircle, Error, FiberManualRecord } from '@material-ui/icons';
import { getGameStatus, statusLine } from '../../utils/gamesHelpers';
import { defaultStatus, GREEN } from '../../utils/globals';
import { rgb } from '../../utils/helpers';

const propTypes = {
  gameId: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};

const statusText = {
  instance: 'Find a Server',
  setup: 'Setup the Server',
  reboot: 'Restart the Server',
  download: 'Download the Code',
  build: 'Build the Code'
};

const statusDesc = {
  instance: "We're spinning up a new server to run your game on.",
  setup: "We're setting up your new server so it can run your game.",
  reboot: 'We need to reboot your server before it can build your game.',
  download: "We're downloading the code you sent us!",
  build: "We're building your code so the server can run your game."
};

const statusTime = {
  instance: 'This will take a few minutes.',
  setup: 'This is going to take a while. (~10mins)',
  reboot: 'This will take a few minutes.',
  download: 'This will only take a few seconds.',
  build: 'This will take a couple minutes.'
};

const statusErrors = {
  instance: 'We were not able to get you a server. Please reach out to us for help.',
  setup: 'We were not able to setup your server. Please reach out to us for help.',
  reboot: 'We were not able to reboot your server. Please reach out to us for help.',
  download: 'We were not able to download your code. Please try uploading it again.',
  build:
    "We were not able to build your code. Double check that your code doesn't have any typos or errors."
};

const GameStatus = forwardRef(({ gameId, games, onClose }, ref) => {
  const [[isReady, didFail], setGameStatus] = useState([true, false]);
  const [game, setGame] = useState({ name: '' });
  const [original, setOriginal] = useState(null);

  // Set game from games[gameId]
  useEffect(() => setGame(games.filter(g => g.id === gameId)[0]), [gameId, games, setGame]);

  // Set isReady from getGameStatus(game)
  useEffect(() => setGameStatus(getGameStatus({ game_status: defaultStatus, ...game })), [
    game,
    setGameStatus
  ]);

  // Set original from game once
  useEffect(() => {
    if (game.name !== '' && original === null) {
      setOriginal({ ...game });
    }
  }, [game, original, setOriginal]);

  // Manually set wrapper height
  useEffect(() => {
    const statuses = Object.keys({
      ...game.game_status,
      ...game.server_status
    });
    statuses.forEach(key => {
      const wrapper = document.getElementById(key);
      if (wrapper) {
        const blank = { clientHeight: 0 };
        const { clientHeight: text } = document.getElementById(`${key}-text`) || blank;
        const { clientHeight: info } = document.getElementById(`${key}-info`) || blank;
        const { clientHeight: error } = document.getElementById(`${key}-error`) || blank;
        wrapper.style.height = `${text + info + error}px`;
      }
    });
  }, [game]);

  const serverFilter =
    original !== null && getGameStatus({ server_status: original.server_status })[0]
      ? ([a]) => Object.keys(defaultStatus).includes(a)
      : () => true;

  const order = a => Object.keys(statusText).indexOf(a);

  const status = {
    ...defaultStatus,
    ...game.game_status,
    ...game.server_status
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper} ref={ref}>
      <Typography className={classes.h1} variant="h2" color="textPrimary">
        {game.name}
      </Typography>
      <div className={classes.status}>
        <Typography style={{ marginRight: 18 }} variant="h4" color="textSecondary">
          Status:
        </Typography>
        <Typography style={{ fontWeight: 200 }} variant="h4" color="textPrimary">
          {statusLine(isReady, didFail)}
        </Typography>
      </div>
      {Object.entries(status)
        .filter(serverFilter)
        .sort(([a], [b]) => order(a) - order(b))
        .map(([key, value]) => (
          <div id={key} key={key} className={classes.item}>
            <Typography
              id={`${key}-text`}
              className={classes.text}
              variant="body1"
              color="textPrimary"
              align="left"
            >
              {statusText[key]}
              <StatusIcon status={value} />
            </Typography>
            {value === 1 && (
              <Typography
                id={`${key}-info`}
                className={classes.subText}
                variant="body2"
                color="textSecondary"
                align="left"
              >
                {statusDesc[key]} {statusTime[key]}
              </Typography>
            )}
            {value === 3 && (
              <Typography
                id={`${key}-error`}
                className={classes.subText}
                variant="body2"
                color="textSecondary"
                align="left"
              >
                {statusErrors[key]}
              </Typography>
            )}
          </div>
        ))}
      <Button variant="outlined" onClick={onClose}>
        Close
      </Button>
    </Paper>
  );
});

GameStatus.propTypes = propTypes;

const StatusIcon = ({ status }) => {
  const colors = [rgb(162, 162, 162), 'inherit', GREEN, 'inherit'];
  const classes = useStyles();
  return (
    <span style={{ color: colors[status] }} className={status === 1 ? classes.spinner : null}>
      {status === 0 && <FiberManualRecord />}
      {status === 1 && <Autorenew color="secondary" />}
      {status === 2 && <CheckCircle />}
      {status === 3 && <Error color="error" />}
    </span>
  );
};
StatusIcon.propTypes = { status: PropTypes.number.isRequired };

const useStyles = makeStyles(theme => ({
  paper: {
    width: '95%',
    maxWidth: 600,
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  h1: {
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  status: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  item: {
    width: '100%',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    transition: 'all 300ms ease'
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
    minWidth: '200px',
    '& span': {
      display: 'flex',
      alignItems: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  subText: {
    width: '65%',
    minWidth: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '90%'
    }
  },
  spinner: {
    animation: `$spin 1s ${theme.transitions.easing.sharp} infinite`
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotateZ(0deg)'
    },
    '50%': {
      transform: 'rotateZ(0deg)'
    },
    '100%': {
      transform: 'rotateZ(360deg)'
    }
  }
}));

export default GameStatus;
