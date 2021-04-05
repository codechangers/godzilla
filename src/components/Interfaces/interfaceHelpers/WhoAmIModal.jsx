import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../UI/Modal';
import WhoAmInterface from '../WhoAmI';

const propTypes = {
  accounts: PropTypes.object.isRequired,
  setWhoAmI: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const WhoAmIModal = ({ accounts, setWhoAmI, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <WhoAmInterface
      accounts={accounts}
      setWhoAmI={w => {
        setWhoAmI(w);
        onClose();
      }}
    />
  </Modal>
);
WhoAmIModal.propTypes = propTypes;

export default WhoAmIModal;
