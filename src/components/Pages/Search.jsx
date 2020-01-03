import React from 'react';
import PropTypes from 'prop-types';

import ClassSearch from '../Interfaces/ClassSearch';

const propTypes = {
  db: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const Search = ({ db, user, accounts }) => (
  <div className="page-wrapper">
    <ClassSearch db={db} user={user} accounts={accounts} />
  </div>
);

Search.propTypes = propTypes;

export default Search;
