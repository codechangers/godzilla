import { useState, useEffect, useMemo } from 'react';
import { toData } from '../utils/helpers';
import { db, auth } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';

/* ===================
 * === Items Hooks ===
 * =================== */

export const getLiveClassCheckOffsData = (classId, teacher = false) => {
  const [checkOffs, setCheckOffs] = useState([]);
  const userType = teacher ? 'teacherId' : 'parentId';
  const refs = useMemo(
    () =>
      auth.currentUser?.uid
        ? db
            .collection('checkOffs')
            .where(userType, '==', auth.currentUser.uid)
            .where('classId', '==', classId)
        : () => {},
    [auth.currentUser]
  );
  const handleError = () => setCheckOffs([]);
  useEffect(liveCheckOffListDataEffect(refs, setCheckOffs, handleError), [refs]);
  return checkOffs;
};

export const getLiveCheckOffsData = page => {
  const [checkOffs, setCheckOffs] = useState([]);
  const ref = useMemo(
    () =>
      auth.currentUser?.uid
        ? db
            .collection('checkOffs')
            .where('parentId', '==', auth.currentUser.uid)
            .where('page', '==', page)
        : () => {},
    [page, auth.currentUser]
  );
  useEffect(liveCheckOffListDataEffect(ref, setCheckOffs), [ref]);
  return checkOffs;
};

const checkItems = (unlocked, value, prefix = '') => {
  const newValue = {};
  Object.entries(value).forEach(([key, val]) => {
    if (typeof val === 'string' && unlocked.includes(prefix + key)) newValue[key] = val;
    else if (typeof val !== 'string') {
      const nextUp = checkItems(unlocked, val, `${prefix}${key}.`);
      if (Object.keys(nextUp).length > 0) newValue[key] = nextUp;
    }
  });
  return newValue;
};

const flattenItems = (fItems, prefix = '') => {
  const flattened = [];
  Object.entries(fItems).forEach(([key, value]) => {
    const item = prefix + key;
    if (typeof value === 'string') flattened.push(item);
    else flattened.push(...flattenItems(value, `${item}.`));
  });
  return flattened;
};

export const useUnlockedItems = (items, locked, whiteList) =>
  locked ? useMemo(() => checkItems(whiteList, items), [items, whiteList]) : items;

export const useFlatItems = items => useMemo(() => flattenItems(items), [items]);

export const useFlatUnlockedItems = (items, locked, whiteList) =>
  useFlatItems(useUnlockedItems(items, locked, whiteList));

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const liveCheckOffListDataEffect = onSnapshotDataEffectBase(true, snap => snap.docs.map(toData));
