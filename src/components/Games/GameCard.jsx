import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, Typography, IconButton, Tooltip, Button } from '@material-ui/core';
import {
  CloudDownload,
  PlayCircleOutline,
  EditOutlined,
  DeleteOutline,
  Loop,
  Help,
  PauseCircleFilledOutlined
} from '@material-ui/icons';
import OptionMenu from './OptionMenu';
import {
  codeInfo,
  codeTime,
  downloadCode,
  makeRequest,
  getGameStatus,
  statusLine
} from '../../utils/gamesHelpers';
import { gameTypes, serverReqs, defaultStatus } from '../../utils/globals';

const propTypes = {
  game: PropTypes.object.isRequired,
  updateToggles: PropTypes.func.isRequired
};

const optionActions = g => ({
  restart: () => makeRequest(serverReqs[0], g),
  stop: () => makeRequest(serverReqs[1], g)
});

const optionIcons = {
  restart: Loop,
  stop: PauseCircleFilledOutlined
};

const GameCard = ({ game, updateToggles }) => {
  const [[isReady, didFail], setGameStatus] = useState([true, false]);

  // Set isReady from getGameStatus(game)
  useEffect(() => setGameStatus(getGameStatus({ game_status: defaultStatus, ...game })), [
    game,
    setGameStatus
  ]);

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <Typography variant="h5">{game.name}</Typography>
        <OptionMenu icons={optionIcons} actions={optionActions(game)} />
      </div>
      <Typography variant="subtitle1" align="left" color="textSecondary">
        <strong>Status:</strong> {statusLine(isReady, didFail)}
        {!isReady && (
          <Tooltip title="Info" placement="right">
            <IconButton
              aria-label="Status Info"
              size="small"
              style={{ marginLeft: 12, marginBottom: 1 }}
              onClick={() => updateToggles({ showGame: game })}
            >
              <Help color="inherit" fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      <Typography variant="subtitle2" align="left" color="textSecondary">
        <strong>Type:</strong> {gameTypes[game.type]}
      </Typography>
      <Typography variant="subtitle2" align="left" color="textSecondary">
        <strong>Code:</strong> {codeInfo(game.code).name} @ {codeTime(game.code)}
        <Tooltip title="Download" placement="right">
          <IconButton
            aria-label="Downlod Code"
            size="small"
            style={{ marginLeft: 12 }}
            onClick={() => downloadCode(game.code)}
          >
            <CloudDownload color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <div className={classes.options}>
        <Button
          aria-label={`Play ${game.name}`}
          color="primary"
          variant="contained"
          startIcon={isReady ? <PlayCircleOutline /> : null}
          onClick={() => window.open(`http://${game.name}.blobbert.io`)}
          disabled={!isReady}
        >
          {isReady ? 'Play' : didFail ? 'Error' : 'Building'}
        </Button>
        <div>
          <Tooltip title="Edit" placement="bottom">
            <IconButton
              aria-label={`Edit ${game.name}`}
              onClick={() => updateToggles({ editGame: game })}
            >
              <EditOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="bottom">
            <IconButton
              aria-label={`Delete ${game.name}`}
              onClick={() => updateToggles({ deleteGame: game })}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

GameCard.propTypes = propTypes;

const useStyles = makeStyles({
  card: {
    width: '90%',
    boxSizing: 'border-box',
    padding: 20
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    '& button': {
      margin: '0 5px'
    }
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  }
});

export default GameCard;
