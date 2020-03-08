import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import Modal from '../../UI/Modal';

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
    <Modal open={obj.isSet} onClose={onCancel} title="Delete Modal" description={prompt}>
      <Typography variant="h4" className={classes.header}>
        {prompt}
      </Typography>
      <div className={classes.options}>
        <Button variant="outlined" onClick={onCancel}>
          {cancel}
        </Button>
        <Button variant="contained" color="secondary" onClick={onConfirm}>
          {del}
        </Button>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = propTypes;
DeleteModal.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  header: {
    width: '70%',
    textAlign: 'center',
    marginBottom: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  options: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

export default DeleteModal;
