import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Modal from '../UI/Modal';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const CheckOffModal = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    title="Check Off Modal"
    description="Check off the progress of participants as they make their way through the competition."
  >
    <Typography variant="h4">Check Off Progress</Typography>
  </Modal>
);
CheckOffModal.propTypes = propTypes;

export default CheckOffModal;
