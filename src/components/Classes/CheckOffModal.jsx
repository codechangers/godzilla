import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Modal from '../UI/Modal';
import { useLiveChildren } from '../../hooks/children';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  childRefs: PropTypes.arrayOf(PropTypes.object).isRequired
};

const CheckOffModal = ({ open, onClose, childRefs }) => {
  const children = useLiveChildren(childRefs);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Check Off Modal"
      description="Check off the progress of participants as they make their way through the competition."
    >
      <Typography variant="h4">Check Off Progress</Typography>
      {children.map(child => (
        <Typography variant="body1" key={child.id}>
          {child.fName}
        </Typography>
      ))}
    </Modal>
  );
};
CheckOffModal.propTypes = propTypes;

export default CheckOffModal;
