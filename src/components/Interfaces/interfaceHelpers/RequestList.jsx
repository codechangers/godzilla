import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, CircularProgress, Grid, Typography } from '@material-ui/core';
import AccountTable from './AccountTable';
import Request, { AccountChip } from '../../UI/Request';
import Modal from '../../UI/Modal';

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
      <Modal
        open={showAccount != null}
        onClose={() => setShowAccount(null)}
        title="Show Account"
        description="Show Account Details for Request Validation"
      >
        {showAccount && (
          <>
            <div className={classes.infoHeader}>
              <Typography variant="h4">Account Info</Typography>
              <AccountChip account={showAccount} />
            </div>
            <AccountTable account={showAccount} orgAccount={orgs} />
          </>
        )}
      </Modal>
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
  infoHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 12px'
  }
}));

export default RequestList;
