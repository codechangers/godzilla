import React from 'react';
import PropTypes from 'prop-types';

import ClassSearch from '../Interfaces/ClassSearch';

const propTypes = {
  db: PropTypes.object.isRequired
};

const Search = ({ db }) => (
  <div className="page-wrapper">
    <ClassSearch db={db} />
  </div>
);

Search.propTypes = propTypes;

export default Search;
