import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button } from '@material-ui/core';
import RequestTable from './RequestTable';
import { AccountChip } from './Request';
import Modal from '../Modal';

const propTypes = {
  showAccount: PropTypes.object.isRequired,
  setShowAccount: PropTypes.func.isRequired,
  orgs: PropTypes.bool
};
const defaultProps = {
  orgs: false
};

const RequestModal = ({ showAccount, setShowAccount, orgs }) => {
  const classes = useStyles();
  return (
    <Modal
      open={showAccount != null}
      onClose={() => setShowAccount(null)}
      title="Show Account"
      description="Show Account Details for Request Validation"
      className={classes.modal}
    >
      {showAccount && (
        <>
          <div className={classes.infoHeader}>
            <Typography variant="h4">Account Info</Typography>
            <AccountChip account={showAccount} />
          </div>
          <RequestTable account={showAccount} orgAccount={orgs} />
          <div className={classes.options}>
            <Button onClick={() => setShowAccount(null)}>Close</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

RequestModal.propTypes = propTypes;
RequestModal.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  infoHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 12px'
  },
  modal: {
    maxWidth: '900px'
  },
  options: {
    marginTop: '8px'
  }
}));

export default RequestModal;
