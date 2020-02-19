import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Fab, CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const propTypes = {
  payment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const PaymentProcess = ({ payment, onClose }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h4" className={classes.header}>
        {payment.succeeded
          ? 'Successfully Processed Payment!'
          : payment.failed
          ? 'Payment process failed!'
          : 'Processing Payment with Stripe...'}
      </Typography>
      {payment.succeeded ? (
        <Typography variant="body2" className={classes.mainText}>
          You can find more information regarding this class in the &quot;My Classes&quot; Section
          of your dashboard.
        </Typography>
      ) : payment.failed ? (
        <Typography variant="body2" className={classes.mainText}>
          {payment.error.length > 0
            ? payment.error
            : 'An error occured while attempting to process your payment. Please try again at a later time.'}
        </Typography>
      ) : null}
      <div
        style={{
          marginTop: '28px',
          position: 'relative'
        }}
      >
        <Fab
          color={payment.succeeded ? 'primary' : 'default'}
          onClick={onClose}
          disabled={!(payment.succeeded || payment.failed)}
        >
          {payment.succeeded ? <CheckIcon /> : payment.failed ? <CloseIcon /> : <div />}
        </Fab>
        {!(payment.succeeded || payment.failed) && (
          <CircularProgress className={classes.spinner} style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </div>
  );
};

PaymentProcess.propTypes = propTypes;

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem'
    }
  },
  mainText: {
    margin: 0,
    marginTop: '8px',
    opacity: 0.7,
    padding: '0 12px',
    [theme.breakpoints.down('xs')]: {
      padding: '0 2px'
    }
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  }
}));

export default PaymentProcess;
