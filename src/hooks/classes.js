import { useState, useEffect, useMemo } from 'react';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';
import { toData } from '../utils/helpers';
import { db } from '../utils/firebase';

/* ===================
 * === Class Hooks ===
 * =================== */

/**
 * Get the data of a class given an id that may or may not be valid.
 *
 * _Optional:_ Set `listenToUpdates` to `true` to listen for snapshots if the id is valid.
 */
export const useIdClass = (id, listenToUpdates = false) => {
  const [cls, setCls] = useState(null);
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useMemo(() => db.collection('classes').doc(id), [id]);
  let listener;
  const checkClass = ([classExists, data]) => {
    if (classExists) setCls(data);
    setExists(classExists);
    if (listener) listener();
    if (classExists && listenToUpdates) {
      listener = ref.onSnapshot(doc => setCls(toData(doc)));
    }
  };
  useEffect(classExistsEffect(ref, checkClass, setLoading), [ref]);
  return [exists, cls, loading];
};

/**
 * Subscrive to the data of each class in a given array of references.
 */
export const useLiveClasses = refs => {
  const [classes, setClasses] = useState([]);
  // Clear classes on empty refs.
  useEffect(() => {
    if (refs.length === 0) setClasses([]);
  }, [refs]);
  // Handle refs.
  useEffect(liveClassesDataEffect(refs, setClasses), [refs]);
  return classes;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const classExistsEffect = getDataEffectBase(true, doc => [doc.exists, toData(doc)]);
const liveClassesDataEffect = onSnapshotDataEffectBase(false);
