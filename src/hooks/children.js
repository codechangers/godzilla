import { useState, useEffect, useMemo } from 'react';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';

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
  const parentRef = useMemo(() => accounts.parents.ref, [accounts]);
  useEffect(parentChildRefsEffect(parentRef, setChildRefs), [parentRef]);
  useEffect(childDataEffect(childRefs, setChildren, setLoading), [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of each of a parents children.
 */
export const useParentsLiveChildren = accounts => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  const parentRef = useMemo(() => accounts.parents.ref, [accounts]);
  useEffect(parentChildRefsEffect(parentRef, setChildRefs), [parentRef]);
  useEffect(liveChildDataEffect(childRefs, setChildren), [childRefs]);
  return children;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

/**
 * Fetch the data of each of the parent's children once.
 */
const childDataEffect = getDataEffectBase(false);

/**
 * Subscribe to each child's data.
 */
const liveChildDataEffect = onSnapshotDataEffectBase(false);

/**
 * Subscribe to the parents children references.
 */
const parentChildRefsEffect = onSnapshotDataEffectBase(true, doc => doc.data().children || []);
