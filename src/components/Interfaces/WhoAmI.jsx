import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired
};

const WhoAmInterface = ({ setWhoAmI }) => (
  <div>
    <h1>Hello World</h1>
    <button onClick={() => setWhoAmI('bob')}>Bye!</button>
  </div>
);

WhoAmInterface.propTypes = propTypes;

export default WhoAmInterface;
