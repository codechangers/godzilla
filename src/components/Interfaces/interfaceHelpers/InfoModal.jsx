import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Modal, Paper, Typography } from '@material-ui/core';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const InfoModal = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus className={classes.modal}>
      <Paper className={classes.paper}>
        <Typography variant="h1">Hello World</Typography>
      </Paper>
    </Modal>
  );
};

InfoModal.propTypes = propTypes;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    padding: '20px',
    outline: 'none'
  }
});

export default InfoModal;
