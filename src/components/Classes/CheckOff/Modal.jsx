import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import CheckOffKids from './Kids';
import CheckOffList from './List';
import Modal from '../../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired
};

const CheckOffModal = ({ open, onClose, cls }) => {
  const [showKidsUI] = useState(false);
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Check Off Modal"
      description="Check off the progress of participants as they make their way through the competition."
      className={classes.paper}
    >
      {showKidsUI ? <CheckOffKids childRefs={cls.children} /> : <CheckOffList cls={cls} />}
      <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
        Close
      </Button>
    </Modal>
  );
};
CheckOffModal.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: 0,
    [theme.breakpoints.down('xs')]: {
      padding: '0 4px 20px 4px'
    }
  }
}));

export default CheckOffModal;
