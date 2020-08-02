import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { CheckCircle, Block } from '@material-ui/icons';
import RequestTable from './RequestTable';
import { AccountChip } from './Request';
import Modal from '../Modal';
import { getStatus } from '../../../helpers';
import { STATUS } from '../../../globals';

const propTypes = {
  showAccount: PropTypes.object,
  setShowAccount: PropTypes.func.isRequired,
  orgs: PropTypes.bool
};
const defaultProps = {
  orgs: false,
  showAccount: null
};

const RequestModal = ({ showAccount, setShowAccount, orgs }) => {
  const accept = () => {
    showAccount.ref.update({ isVerrified: true });
    setShowAccount(null);
  };

  const decline = () => {
    showAccount.ref.update({ isDeclined: true });
    setShowAccount(null);
  };

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
            <AccountChip status={getStatus(showAccount)} />
          </div>
          <RequestTable account={showAccount} orgAccount={orgs} />
          <div className={classes.options}>
            <Button variant="outlined" onClick={() => setShowAccount(null)}>
              Cancel
            </Button>
            {getStatus(showAccount) === STATUS.PENDING && (
              <>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={decline}
                  startIcon={<Block />}
                >
                  Decline
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={accept}
                  startIcon={<CheckCircle />}
                >
                  Accept
                </Button>
              </>
            )}
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
    padding: '0 12px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  modal: {
    maxWidth: '900px'
  },
  options: {
    '& button': {
      margin: '8px 10px 0 10px'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap-reverse',
      '& button': {
        flexGrow: 1
      }
    }
  }
}));

export default RequestModal;
