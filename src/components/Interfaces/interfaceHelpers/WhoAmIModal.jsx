import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../UI/Modal';
import WhoAmInterface from '../WhoAmI';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const WhoAmIModal = ({ setWhoAmI, open, onClose }) => (
  <Modal open={open} onClose={onClose} noWrapper>
    <WhoAmInterface
      parentIsModal
      setWhoAmI={w => {
        setWhoAmI(w);
        onClose();
      }}
    />
  </Modal>
);
WhoAmIModal.propTypes = propTypes;

export default WhoAmIModal;
