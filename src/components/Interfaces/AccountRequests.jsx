import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tabs, Tab, Typography } from '@material-ui/core';
import RequestList from '../UI/Requests/RequestList';
import TabPanel from '../UI/TabPanel';

const propTypes = {
  db: PropTypes.object.isRequired
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
                ref: u.ref,
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
      <Typography variant="h2" className={classes.header}>
        Account Requests
      </Typography>
      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} indicatorColor="primary">
        <Tab label="Teacher Requests" />
        <Tab label="Organization Requests" />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={classes.panel}>
        <RequestList reqs={teacherReqs} loading={loadingTeachers} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={classes.panel}>
        <RequestList reqs={orgReqs} loading={loadingOrgs} orgs />
      </TabPanel>
    </div>
  );
};

AccountRequests.propTypes = propTypes;

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
