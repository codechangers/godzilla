import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const StudentIDs = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.header}>
        Student IDs
      </Typography>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 8px 15px 8px'
  },
  header: {
    marginBottom: '15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  }
}));

export default StudentIDs;
