import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Fab, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const propTypes = {
  payment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  waiver: PropTypes.bool
};

const defaultProps = {
  waiver: false
};

const PaymentProcess = ({ payment, onClose, waiver }) => {
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
          You can find more information regarding this class in the &quot;Contests&quot; Section of
          your dashboard.
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
          variant="extended"
          className={classes.fab}
          color={payment.succeeded ? 'primary' : 'default'}
          onClick={onClose}
          disabled={!(payment.succeeded || payment.failed)}
        >
          {payment.succeeded ? (
            <CheckIcon className={clsx({ [classes.hiddenIcon]: waiver })} />
          ) : payment.failed ? (
            <CloseIcon />
          ) : (
            <div />
          )}
          {payment.succeeded && waiver && (
            <div className={classes.waiver}>Fill out the contest waiver</div>
          )}
        </Fab>
        {!(payment.succeeded || payment.failed) && (
          <CircularProgress className={classes.spinner} style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </div>
  );
};
PaymentProcess.propTypes = propTypes;
PaymentProcess.defaultProps = defaultProps;

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
      fontSize: '1.5rem',
      lineHeight: '25px',
      textAlign: 'center'
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
  },
  fab: { padding: 0 },
  hiddenIcon: {
    animation: `$hideIconAnim 1500ms ${theme.transitions.easing.easeInOut}`,
    marginRight: -24,
    opacity: 0
  },
  waiver: {
    whiteSpace: 'nowrap',
    textOverflow: 'hidden',
    overflow: 'hidden',
    margin: '0 20px',
    animation: `$waiverAnim 1500ms ${theme.transitions.easing.easeInOut}`
  },
  '@keyframes hideIconAnim': {
    '0%': { marginRight: 0, opacity: 1 },
    '60%': { marginRight: 0, opacity: 1 },
    '100%': { marginRight: -24, opacity: 0 }
  },
  '@keyframes waiverAnim': {
    '0%': { width: 0, margin: 0 },
    '60%': { width: 0, margin: 0 },
    '100%': { width: 226, margin: '0 20px' }
  }
}));

export default PaymentProcess;
