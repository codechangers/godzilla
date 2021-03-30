import { useState, useEffect } from 'react';

const data = doc => ({ ...doc.data(), id: doc.id, ref: doc.ref });

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
          await Promise.all(childrenRefs.map(async childRef => data(await childRef.get())))
        );
      }),
    [accounts]
  );
  return children;
};

/**
 * Subscribe to a child's data.
 */
export const useChild = ref => {
  const [child, setChild] = useState(null);
  useEffect(
    () =>
      ref.onSnapshot(childDoc => {
        setChild(data(childDoc));
        console.log(child);
      }),
    [ref]
  );
  return child;
};
