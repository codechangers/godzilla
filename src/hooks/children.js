import { useState, useEffect } from 'react';
import { toData } from '../helpers';

/**
 * Subscribe to a parent's children.
 */
export const useParentChildren = accounts => {
  const [children, setChildren] = useState([]);
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        const childrenRefs = parentDoc.data().children || [];
        setChildren(await getChildren(childrenRefs));
      }),
    [accounts]
  );
  return children;
};

/**
 * Get data from childRefs.
 */
export const useChildren = childrenRefs => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    /**
     * This is how you are supposed to run async code in an effect.
     * See this github issue for details:
     * https://github.com/facebook/react/issues/14326#issuecomment-441680293
     */
    async function run() {
      setChildren(await getChildren(childrenRefs));
    }
    run();
  }, [childrenRefs]);
  return children;
};

/**
 * Get the data of a list of child references.
 */
const getChildren = refs => Promise.all(refs.map(async childRef => toData(await childRef.get())));
