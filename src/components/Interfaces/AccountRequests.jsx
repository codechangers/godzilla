import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography } from '@material-ui/core';
import Requests from './interfaceHelpers/Requests';
import TabPanel from '../UI/TabPanel';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const AccountRequests = ({ db }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const classes = useStyles();
  return (
    <div className={classes.reqsWrapper}>
      <Typography variant="h2" style={{ marginBottom: '15px' }}>
        Account Requests
      </Typography>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} indicatorColor="primary">
        <Tab label="Teacher Requests" />
        <Tab label="Organization Requests" />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={classes.panel}>
        <Requests db={db} collection={db.collection('teachers')} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.panel}>
        <Requests db={db} collection={db.collection('organizations')} />
      </TabPanel>
    </div>
  );
};

AccountRequests.propTypes = propTypes;

const useStyles = makeStyles({
  reqsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 8px 15px 8px'
  },
  panel: {
    width: '50%'
  }
});

export default AccountRequests;
