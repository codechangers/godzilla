import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';
import { db } from '../../../utils/firebase';

const propTypes = {
  game: PropTypes.object.isRequired,
  onClose: PropTypes.func
};
const defaultProps = {
  onClose: () => {}
};

const DeleteGame = forwardRef(({ game, onClose }, ref) => {
  const deleteGame = () => {
    // TODO: Delete code file from storage
    db.collection('games')
      .doc(game.id)
      .delete()
      .then(() => {
        onClose();
      })
      .catch(err => console.error(err));
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper} ref={ref}>
      <Typography variant="h4" color="textPrimary" align="center">
        {`Delete ${game.name}`}
      </Typography>
      <Typography variant="h6" color="textSecondary" align="center">
        {`Are you sure you want to delete ${game.name}?`}
      </Typography>
      <div className={classes.options}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={deleteGame}>
          Delete
        </Button>
      </div>
    </Paper>
  );
});

DeleteGame.propTypes = propTypes;
DeleteGame.defaultProps = defaultProps;

const useStyles = makeStyles({
  paper: {
    width: '95%',
    maxWidth: 600,
    boxSizing: 'border-box',
    padding: '30px 12px'
  },
  options: {
    width: '80%',
    margin: '10px 10%',
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

export default DeleteGame;
