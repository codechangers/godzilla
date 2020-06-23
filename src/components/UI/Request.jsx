import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

const propTypes = {
  account: PropTypes.object.isRequired
};

const Request = ({ account }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div>
        <Typography variant="h5">
          {account.parent.fName} {account.parent.lName}
        </Typography>
      </div>
    </div>
  );
};

Request.propTypes = propTypes;

const useStyles = makeStyles({
  wrapper: {
    width: '98%',
    padding: '10px 40px',
    boxSizing: 'border-box',
    borderTop: '1px solid rgba(100,100,100,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default Request;
