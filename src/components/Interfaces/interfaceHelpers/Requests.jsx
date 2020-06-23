import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, makeStyles } from '@material-ui/core';
import Spinner from '../../UI/Spinner';
import Request from '../../UI/Request';

const propTypes = {
  db: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired
};

const Requests = ({ db, collection }) => {
  const [reqs, setReqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, [collection, db]);

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {isLoading ? <Spinner color="primary" /> : reqs.map(r => <Request account={r} key={r.id} />)}
    </Paper>
  );
};

Requests.propTypes = propTypes;

const useStyles = makeStyles({
  paper: {
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box'
  }
});

export default Requests;
