import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner';

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
      const requests = users.docs.map(u => ({
        id: u.id,
        ...u.data(),
        parent: db
          .collection('parents')
          .doc(u.id)
          .get()
          .then(doc => doc.data())
      }));
      requests.sort((a, b) => new Date(b.dateApplied.seconds) - new Date(a.dateApplied.seconds));
      setReqs(requests);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>{isLoading ? <Spinner color="primary" /> : reqs.map(r => <p>This is a req...</p>)}</div>
  );
};

Requests.propTypes = propTypes;

export default Requests;
