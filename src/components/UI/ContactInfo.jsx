import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Paper } from '@material-ui/core';

const propTypes = {
  cls: PropTypes.object,
  onClose: PropTypes.func.isRequired
};

const defaultProps = {
  cls: null
};

const ContactInfo = ({ cls, onClose }) => {
  return (
    <Modal
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      open={cls !== null}
      onClose={onClose}
      disableAutoFocus
    >
      <Paper>
        <h1>Contact Info</h1>
      </Paper>
    </Modal>
  );
};

ContactInfo.propTypes = propTypes;
ContactInfo.defaultProps = defaultProps;

export default ContactInfo;
