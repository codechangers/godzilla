import { useState, useEffect, useMemo } from 'react';
import { toData } from '../utils/helpers';
import { db, auth } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';

/* ===================
 * === Items Hooks ===
 * =================== */

/**
 * This will subscribe to all check offs that the current user has access to.
 * It allows you to pass filters in to get only check offs that you need.
 *
 * Note: When calling this from "teacherland" you need to pass `true` as the
 * second parameter to get the proper results.
 */
export const getFilteredLiveCheckOffsData = (applyFilter = a => a, forTeacher = false) => {
  const [checkOffs, setCheckOffs] = useState([]);
  const userType = forTeacher ? 'teacherId' : 'parentId';
  const refs = useMemo(
    () =>
      auth.currentUser?.uid
        ? applyFilter(db.collection('checkOffs').where(userType, '==', auth.currentUser.uid))
        : () => {},
    [auth.currentUser]
  );
  const handleError = () => setCheckOffs([]);
  useEffect(liveCheckOffListDataEffect(refs, setCheckOffs, handleError), [refs]);
  return checkOffs;
};

// ******************
// TODO: Remove these hooks and replace them with direct helper function calls in the components.
// ******************
export const useUnlockedItems = (items, locked, whiteList) =>
  locked ? useMemo(() => filterPages(whiteList, items), [items, whiteList]) : items;

export const useFlatItems = items => useMemo(() => flattenPages(items), [items]);

export const useFlatUnlockedItems = (items, locked, whiteList) =>
  useFlatItems(useUnlockedItems(items, locked, whiteList));

/* ===============================
 * === Custom Helper Functions ===
 * =============================== */

/**
 * Check the given `value` object against the given `unlocked` whitelist.
 * Return only the allowed values.
 */
export const filterPages = (unlocked, value, prefix = '') => {
  const newValue = {};
  Object.entries(value).forEach(([key, val]) => {
    if (typeof val === 'string' && unlocked.includes(prefix + key)) newValue[key] = val;
    else if (typeof val !== 'string') {
      const nextUp = filterPages(unlocked, val, `${prefix}${key}.`);
      if (Object.keys(nextUp).length > 0) newValue[key] = nextUp;
    }
  });
  return newValue;
};

/**
 * Flatten a multi-dimentional object into a single array of pages.
 */
export const flattenPages = (fItems, prefix = '') => {
  const flattened = [];
  Object.entries(fItems).forEach(([key, value]) => {
    const item = prefix + key;
    if (typeof value === 'string') flattened.push(item);
    else flattened.push(...flattenPages(value, `${item}.`));
  });
  return flattened;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const liveCheckOffListDataEffect = onSnapshotDataEffectBase(true, snap => snap.docs.map(toData));
