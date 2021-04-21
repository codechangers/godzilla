import { useState, useEffect } from 'react';
import { toData } from '../utils/helpers';

/* ======================
 * === Children Hooks ===
 * ====================== */

/**
 * Get the data of each child reference given.
 */
export const useChildren = childRefs => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(childDataEffect(childRefs, setChildren, setLoading), [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of of teach of the child references given.
 */
export const useLiveChildren = childRefs => {
  const [children, setChildren] = useState([]);
  useEffect(liveChildDataEffect(childRefs, setChildren), [childRefs]);
  return children;
};

/**
 * Get the data of each of a parents children.
 */
export const useParentsChildren = accounts => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(parentChildRefsEffect(accounts, setChildRefs), [accounts]);
  useEffect(childDataEffect(childRefs, setChildren, setLoading), [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of each of a parents children.
 */
export const useParentsLiveChildren = accounts => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  useEffect(parentChildRefsEffect(accounts, setChildRefs), [accounts]);
  useEffect(liveChildDataEffect(childRefs, setChildren), [childRefs]);
  return children;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

/**
 * Fetch the data of each of the parent's children once.
 */
const childDataEffect = (childRefs, setChildren, setLoading) => () => {
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
};

/**
 * Subscrive to each child's data.
 */
const liveChildDataEffect = (childRefs, setChildren) => {
  let subs = [];
  return () => {
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
  };
};

/**
 * Subscribe to the parents children references.
 */
const parentChildRefsEffect = (accounts, setChildRefs) => () =>
  accounts.parents.ref.onSnapshot(async parentDoc => {
    setChildRefs(parentDoc.data().children || []);
  });

/* ====================
 * === Hook Helpers ===
 * ==================== */

/**
 * Get the data of a list of child references.
 */
const getChildren = refs => Promise.all(refs.map(async childRef => toData(await childRef.get())));
