import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography, Paper, CircularProgress } from '@material-ui/core';
import TabPanel from '../UI/TabPanel';
import Request from '../UI/Request';

const propTypes = {
  firebase: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const AccountRequests = ({ db }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingOrgs, setLoadingOrgs] = useState(false);
  const [teacherReqs, setTeacherReqs] = useState([]);
  const [orgReqs, setOrgReqs] = useState([]);

  useEffect(() => {
    const subToReqs = (collection, setReqs, setIsLoading) =>
      collection.onSnapshot(users => {
        setIsLoading(true);
        const requests = [];
        users.docs.forEach(u => {
          db.collection('parents')
            .doc(u.id)
            .get()
            .then(parentDoc => {
              const req = {
                id: u.id,
                ...u.data(),
                parent: parentDoc.data()
              };
              requests.push(req);
              if (requests.length === users.docs.length) {
                requests.sort(
                  (a, b) => new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds)
                );
                setReqs(requests);
                setIsLoading(false);
              }
            });
        });
      });
    const cancelTeachers = subToReqs(db.collection('teachers'), setTeacherReqs, setLoadingTeachers);
    const cancelOrgs = subToReqs(db.collection('organizations'), setOrgReqs, setLoadingOrgs);
    return () => {
      cancelTeachers();
      cancelOrgs();
    };
  }, [db]);

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
        <Paper className={classes.paper}>
          {loadingTeachers ? (
            <CircularProgress color="primary" />
          ) : (
            teacherReqs.map(r => <Request account={r} key={r.id} />)
          )}
        </Paper>
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.panel}>
        <Paper className={classes.paper}>
          {loadingOrgs ? (
            <CircularProgress color="primary" />
          ) : (
            orgReqs.map(r => <Request account={r} key={r.id} />)
          )}
        </Paper>
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
  },
  paper: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default AccountRequests;
