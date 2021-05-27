import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { History, Update } from '@material-ui/icons';
import CheckOffKids from './Kids';
import CheckOffList from './List';
import Modal from '../../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cls: PropTypes.object.isRequired
};

const CheckOffModal = ({ open, onClose, cls }) => {
  const [showKidsUI, setShowKidsUI] = useState(false);
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
      <div className={classes.options}>
        <div style={{ display: 'block', width: 48 }} />
        <Button onClick={onClose} style={{ paddingLeft: 50, paddingRight: 50 }}>
          Close
        </Button>
        <Tooltip title={showKidsUI ? 'Use New UI' : 'Use Old UI'}>
          <IconButton
            onClick={() => setShowKidsUI(!showKidsUI)}
            color={showKidsUI ? 'secondary' : 'default'}
          >
            {showKidsUI ? <Update /> : <History />}
          </IconButton>
        </Tooltip>
      </div>
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
  },
  options: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}));

export default CheckOffModal;
