import { useState, useEffect } from 'react';
import { toData } from '../helpers';

/**
 * Subscribe to a parent's children.
 */
export const useChildren = accounts => {
  const [children, setChildren] = useState([]);
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        const childrenRefs = parentDoc.data().children || [];
        setChildren(
          await Promise.all(childrenRefs.map(async childRef => toData(await childRef.get())))
        );
      }),
    [accounts]
  );
  return children;
};
