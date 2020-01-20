import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper, Button, makeStyles } from '@material-ui/core';

const propTypes = {
  obj: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  cancel: PropTypes.string,
  del: PropTypes.string
};

const defaultProps = {
  prompt: 'Are you sure you want to delete?',
  cancel: 'Cancel',
  del: 'Delete'
};

const DeleteModal = ({ obj, onCancel, onConfirm, prompt, cancel, del }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={obj.isSet}
      onClose={onCancel}
      disableAutoFocus
      className={classes.modal}
    >
      <Paper className={classes.paper}>
        <h1 className={classes.header}>{prompt}</h1>
        <div className={classes.options}>
          <Button variant="outlined" onClick={onCancel}>
            {cancel}
          </Button>
          <Button variant="contained" color="secondary" onClick={onConfirm}>
            {del}
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

DeleteModal.propTypes = propTypes;
DeleteModal.defaultProps = defaultProps;

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    width: '50%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 'none'
  },
  header: {
    width: '60%'
  },
  options: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  }
});

export default DeleteModal;
