import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  setWhoAmI: PropTypes.func.isRequired,
  accounts: PropTypes.object.isRequired
};

const WhoAmInterface = ({ setWhoAmI, accounts }) => {
  const [children, setChildren] = useState([]);

  /**
   * Subscribe to the parent's children.
   */
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        const childrenRefs = parentDoc.data().children || [];
        const childrenData = [];
        await Promise.all(
          childrenRefs.map(async childRef => {
            const childDoc = await childRef.get();
            childrenData.push({ ...childDoc.data(), id: childDoc.id, ref: childDoc.ref });
          })
        );
        setChildren(childrenData);
      }),
    []
  );

  return (
    <div>
      <h1>Hello World</h1>
      {children.map(child => (
        <p key={child.id}>{child.fName}</p>
      ))}
      <button onClick={() => setWhoAmI('bob')}>Bye!</button>
    </div>
  );
};

WhoAmInterface.propTypes = propTypes;

export default WhoAmInterface;
