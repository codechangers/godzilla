import { useState, useEffect } from 'react';
import { toData } from '../utils/helpers';

/**
 * Get static data from a given parent's children.
 */
export const useParentChildren = accounts => getParentChildren(accounts, useChildren);

/**
 * Get live updating child data from a given parent.
 */
export const useLiveParentChildren = accounts => getParentChildren(accounts, useLiveChildren);

/**
 * Subscribe to a parent account and run a given callback when their children update.
 */
const getParentChildren = (accounts, callback) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        setLoading(true);
        const childRefs = parentDoc.data().children || [];
        setChildren(await callback(childRefs));
        setLoading(false);
      }),
    [accounts]
  );
  return [children, loading];
};

/**
 * Get data from childRefs.
 */
export const useChildren = childRefs => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    /**
     * This is how you are supposed to run async code in an effect.
     * See this github issue for details:
     * https://github.com/facebook/react/issues/14326#issuecomment-441680293
     */
    async function run() {
      setChildren(await getChildren(childRefs));
    }
    run();
  }, [childRefs]);
  return children;
};

/**
 * Subscribe to each child reference given.
 */
export const useLiveChildren = childRefs => {
  const [children, setChildren] = useState([]);
  let subs = [];
  useEffect(() => {
    const childrenMap = {};
    childRefs.forEach(ref => {
      const sub = ref.onSnapshot(childDoc => {
        childrenMap[childDoc.id] = toData(childDoc);
        setChildren(Object.values(childrenMap));
      });
      subs.push(sub);
    });
    // Cleanup subscriptions.
    return () => {
      subs.forEach(sub => sub());
      subs = [];
    };
  }, [childRefs]);
  return children;
};

/**
 * Get the data of a list of child references.
 */
const getChildren = refs => Promise.all(refs.map(async childRef => toData(await childRef.get())));
