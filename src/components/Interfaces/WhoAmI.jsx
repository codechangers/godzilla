import React from 'react';
import PropTypes from 'prop-types';
import { useChildren } from '../../hooks/children';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired
};

const WhoAmInterface = ({ setWhoAmI, accounts }) => {
  const children = useChildren(accounts);

  return (
    <div>
      <h1>Hello World</h1>
      {children.map(child => (
        <button key={child.id} onClick={() => setWhoAmI(child.id)}>
          {child.fName}
        </button>
      ))}
    </div>
  );
};

WhoAmInterface.propTypes = propTypes;

export default WhoAmInterface;
