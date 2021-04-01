import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const CheckOffModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <h1>Check oFf</h1>
  </Modal>
);
CheckOffModal.propTypes = propTypes;

export default CheckOffModal;
