import React from 'react';
import PropTypes from 'prop-types';
import MUIModal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core';
import Paper from './Paper';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  noWrapper: PropTypes.bool
};

const Modal = ({ open, onClose, children, className, title, description, noWrapper }) => {
  const classes = useStyles();
  return (
    <MUIModal
      open={open}
      onClose={onClose}
      disableAutoFocus
      className={classes.modal}
      aria-labelledby={title}
      aria-describedby={description}
    >
      {noWrapper ? children : <Paper className={className}>{children}</Paper>}
    </MUIModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = {
  open: false,
  children: null,
  className: '',
  title: 'Modal',
  description: 'This is a UI Modal',
  noWrapper: false
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '96px',
    transition: 'padding 300ms ease',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '0'
    }
  }
}));

export default Modal;
