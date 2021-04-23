import React, { useState } from 'react';
import { makeStyles, Tabs, Tab, Typography } from '@material-ui/core';
import RequestList from '../UI/Requests/RequestList';
import TabPanel from '../UI/TabPanel';
import { useAccountRequests } from '../../hooks/accountReqs';

const AccountRequests = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const teacherReqs = useAccountRequests('teachers');
  const orgReqs = useAccountRequests('organizations');

  const classes = useStyles();
  return (
    <div className={classes.reqsWrapper}>
      <Typography variant="h2" className={classes.header}>
        Account Requests
      </Typography>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} indicatorColor="primary">
        <Tab label="Teacher Requests" />
        <Tab label="Organization Requests" />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={classes.panel}>
        <RequestList reqs={teacherReqs} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.panel}>
        <RequestList reqs={orgReqs} orgs />
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  reqsWrapper: {
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
  },
  panel: {
    width: '100%',
    padding: 0,
    '& > div.MuiBox-root': {
      padding: 0,
      paddingTop: '20px'
    }
  }
}));

export default AccountRequests;
