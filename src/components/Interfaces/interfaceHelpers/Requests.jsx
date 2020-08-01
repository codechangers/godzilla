import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, CircularProgress, Grid } from '@material-ui/core';
import Request from '../../UI/Request';

const propTypes = {
  reqs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const Requests = ({ reqs, loading }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={0} sm={1} md={2} lg={3} />
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper className={classes.paper}>
          {loading ? (
            <CircularProgress color="primary" />
          ) : (
            reqs.map(r => <Request account={r} key={r.id} />)
          )}
        </Paper>
      </Grid>
      <Grid item xs={0} sm={2} md={3} />
    </Grid>
  );
};

Requests.propTypes = propTypes;

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
  }
}));

export default Requests;
