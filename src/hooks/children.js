import { useState, useEffect } from 'react';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';
import { useAccountRef } from './accounts';

/* ======================
 * === Children Hooks ===
 * ====================== */

/**
 * Subscribe to the data of a given child reference.
 */
export const useLiveChild = childRef => {
  const [child, setChild] = useState(null);
  useEffect(liveChildDataEffect(childRef, setChild), [childRef]);
  return child;
};

/**
 * Get the data of each child reference given.
 */
export const useChildren = childRefs => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(childrenDataEffect(childRefs, setChildren, setLoading), [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of of teach of the child references given.
 */
export const useLiveChildren = childRefs => {
  const [children, setChildren] = useState([]);
  useEffect(liveChildrenDataEffect(childRefs, setChildren), [childRefs]);
  return children;
};

/**
 * Get the data of each of a parents children.
 */
export const useParentsChildren = () => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleError = () => setLoading(false);
  const parentRef = useAccountRef('parents');
  useEffect(parentChildRefsEffect(parentRef, setChildRefs, handleError), [parentRef]);
  useEffect(childrenDataEffect(childRefs, setChildren, setLoading), [childRefs]);
  return [children, loading];
};

/**
 * Subscribe to the data of each of a parents children.
 */
export const useParentsLiveChildren = () => {
  const [childRefs, setChildRefs] = useState([]);
  const [children, setChildren] = useState([]);
  const parentRef = useAccountRef('parents');
  useEffect(parentChildRefsEffect(parentRef, setChildRefs), [parentRef]);
  useEffect(liveChildrenDataEffect(childRefs, setChildren), [childRefs]);
  return children;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const childrenDataEffect = getDataEffectBase(false);
const liveChildDataEffect = onSnapshotDataEffectBase(true);
const liveChildrenDataEffect = onSnapshotDataEffectBase(false);
const parentChildRefsEffect = onSnapshotDataEffectBase(true, doc => doc.data().children || []);
