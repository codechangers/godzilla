import React from 'react';
import PropTypes from 'prop-types';
import ClassSearch from '../Interfaces/ClassSearch';
import { db } from '../../utils/firebase';

const propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired
};

const Search = ({ user, accounts }) => (
  <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--background-color)' }}>
    <ClassSearch db={db} user={user} accounts={accounts} />
  </div>
);

Search.propTypes = propTypes;

export default Search;
