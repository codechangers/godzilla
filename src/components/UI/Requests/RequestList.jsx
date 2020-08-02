import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, CircularProgress, Grid } from '@material-ui/core';
import Request, { AccountChip } from './Request';
import RequestModal from './RequestModal';
import { STATUS } from '../../../globals';

const propTypes = {
  reqs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  orgs: PropTypes.bool
};

const defaultProps = {
  orgs: false
};

const RequestList = ({ reqs, loading, orgs }) => {
  const [showAccount, setShowAccount] = useState(null);

  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={false} sm={1} md={2} lg={3} />
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div className={classes.toggles}>
            <button onClick={() => console.log('accepted')}>
              <AccountChip status={STATUS.ACCEPTED} />
            </button>
            <button onClick={() => console.log('pending')}>
              <AccountChip status={STATUS.PENDING} />
            </button>
            <button onClick={() => console.log('declinded')}>
              <AccountChip status={STATUS.DECLINED} />
            </button>
          </div>
          <Paper className={classes.paper}>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              reqs.map(r => <Request account={r} key={r.id} show={setShowAccount} />)
            )}
          </Paper>
        </Grid>
        <Grid item xs={false} sm={1} md={2} lg={3} />
      </Grid>
      <RequestModal showAccount={showAccount} setShowAccount={setShowAccount} orgs={orgs} />
    </>
  );
};

RequestList.propTypes = propTypes;
RequestList.defaultProps = defaultProps;

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '18px 2px'
    }
  },
  toggles: {
    width: '100%',
    marginBottom: '10px',
    '& > button': {
      border: 'none',
      outline: 'none',
      background: 'none',
      padding: '0',
      margin: '0 6px'
    },
    '& > button:first-child': {
      marginLeft: 0,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 6
      }
    },
    '& > button > div': {
      cursor: 'pointer'
    }
  }
}));

export default RequestList;
