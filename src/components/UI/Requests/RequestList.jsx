import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, CircularProgress, Grid, Typography } from '@material-ui/core';
import Request, { AccountChip } from './Request';
import RequestModal from './RequestModal';
import { STATUS } from '../../../utils/globals';
import { getStatus } from '../../../utils/helpers';

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
  const [toggles, setToggles] = useState({
    ACCEPTED: false,
    PENDING: true,
    DECLINED: false
  });

  const toggleStatus = status => {
    setToggles({ ...toggles, [status]: !toggles[status] });
  };

  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={false} sm={1} md={2} lg={3} />
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <div className={classes.toggles}>
            <AccountChip
              status={STATUS.ACCEPTED}
              outlined={!toggles[STATUS.ACCEPTED]}
              onClick={() => toggleStatus(STATUS.ACCEPTED)}
            />
            <AccountChip
              status={STATUS.PENDING}
              outlined={!toggles[STATUS.PENDING]}
              onClick={() => toggleStatus(STATUS.PENDING)}
            />
            <AccountChip
              status={STATUS.DECLINED}
              outlined={!toggles[STATUS.DECLINED]}
              onClick={() => toggleStatus(STATUS.DECLINED)}
            />
          </div>
          <Paper className={classes.paper}>
            {!loading && reqs.filter(r => toggles[getStatus(r)]).length === 0 && (
              <Typography variant="body1">Account Requests Empty...</Typography>
            )}
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              reqs
                .filter(r => toggles[getStatus(r)])
                .map(r => <Request account={r} key={r.id} show={setShowAccount} />)
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
    '& > div': {
      margin: '0 6px'
    },
    '& > div:first-child': {
      marginLeft: 0,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 6
      }
    }
  }
}));

export default RequestList;
