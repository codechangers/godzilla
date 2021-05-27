import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ChooseFile from './ChooseFile';
import { gameTypes } from '../../utils/globals';

const propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  game: PropTypes.object
};
const defaultProps = {
  title: 'Game Form',
  error: '',
  onSubmit: () => {},
  onCancel: () => {},
  game: { name: '', type: '', file: null }
};

const GameForm = forwardRef(({ title, error, onSubmit, onCancel, game }, ref) => {
  const [newGame, setNewGame] = useState(game || { name: '', type: '', file: null });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(newGame);
  };

  const classes = useStyles();
  const [errCode, errMessage] = error.split('|') || ['', ''];
  return (
    <Paper className={classes.paper} ref={ref}>
      <Typography variant="h4" color="textPrimary" align="center" style={{ marginBottom: 20 }}>
        {title}
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          type="text"
          label="Name"
          value={newGame.name}
          onChange={e => setNewGame({ ...newGame, name: e.target.value })}
          variant="outlined"
          className={classes.input}
          error={errCode === '1'}
          helperText={errCode === '1' ? errMessage : ''}
        />
        <TextField
          select
          label="Type"
          value={newGame.type}
          onChange={e => setNewGame({ ...newGame, type: e.target.value })}
          variant="outlined"
          className={classes.input}
          error={errCode === '2'}
          helperText={errCode === '2' ? errMessage : ''}
        >
          {Object.keys(gameTypes).map(key => {
            if (key) {
              return (
                <MenuItem key={key} value={key}>
                  {gameTypes[key]}
                </MenuItem>
              );
            }
            return null;
          })}
        </TextField>
        <ChooseFile
          value={newGame.code || ''}
          onChange={file => setNewGame({ ...newGame, file })}
          onUpdate={file => {
            const updateGame = { ...newGame, file };
            delete updateGame.code;
            setNewGame(updateGame);
          }}
          error={errCode === '3'}
          helperText={errCode === '3' ? errMessage : ''}
        />
        <div className={classes.options}>
          <Button type="button" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      <Snackbar open={errCode === '0'} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          {errMessage}
        </MuiAlert>
      </Snackbar>
    </Paper>
  );
});

GameForm.propTypes = propTypes;
GameForm.defaultProps = defaultProps;

const useStyles = makeStyles({
  paper: {
    width: '95%',
    maxWidth: 600,
    maxHeight: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    padding: 20
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    marginBottom: 12
  },
  options: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 14,
    '& button': {
      width: '30%'
    }
  }
});

export default GameForm;
