import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, CircularProgress, Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const propTypes = {
  message: PropTypes.string.isRequired,
  succeeded: PropTypes.bool,
  failed: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

const defaultProps = {
  succeeded: false,
  failed: false
};

const StatusCard = forwardRef(({ message, succeeded, failed, onClose }, ref) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} ref={ref}>
      <Typography variant="h4" color="textPrimary" style={{ marginBottom: 20 }}>
        {message}
      </Typography>
      <div
        style={{
          marginTop: '18px',
          position: 'relative'
        }}
      >
        <Fab
          color={succeeded ? 'primary' : 'default'}
          onClick={onClose}
          disabled={!(succeeded || failed)}
        >
          {succeeded ? <CheckIcon /> : failed ? <CloseIcon /> : <div />}
        </Fab>
        {!(succeeded || failed) && (
          <CircularProgress className={classes.spinner} style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </Paper>
  );
});

StatusCard.propTypes = propTypes;
StatusCard.defaultProps = defaultProps;

const useStyles = makeStyles({
  paper: {
    width: '95%',
    maxWidth: 600,
    boxSizing: 'border-box',
    padding: '30px 10px 40px 10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  }
});

export default StatusCard;
