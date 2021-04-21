import { useState, useEffect } from 'react';
import { toData } from '../utils/helpers';

/**
 * Get the data of each of a parents children.
 */
export const useChildren = accounts => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  // Subscribe to the parents children references.
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        setChildRefs(parentDoc.data().children || []);
      }),
    [accounts]
  );
  // Fetch the data of each of the parent's children once.
  useEffect(() => {
    /**
     * This is how you are supposed to run async code in an effect.
     * See this github issue for details:
     * https://github.com/facebook/react/issues/14326#issuecomment-441680293
     */
    async function run() {
      setLoading(true);
      setChildren(await getChildren(childRefs));
      setLoading(false);
    }
    run();
  }, [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of each of a parents children.
 */
export const useLiveChildren = accounts => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  let subs = [];
  // Subscribe to the parents children references.
  useEffect(
    () =>
      accounts.parents.ref.onSnapshot(async parentDoc => {
        setChildRefs(parentDoc.data().children || []);
      }),
    [accounts]
  );
  // Subscrive to each child's data.
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
