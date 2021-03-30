import { useState, useEffect } from 'react';

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
          await Promise.all(
            childrenRefs.map(async childRef => {
              const childDoc = await childRef.get();
              return { ...childDoc.data(), id: childDoc.id, ref: childDoc.ref };
            })
          )
        );
      }),
    [accounts]
  );

  return children;
};
