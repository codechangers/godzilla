import { useState, useEffect, useMemo } from 'react';
import { toData } from '../utils/helpers';
import { db, auth } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';
import tutorials from '../resources/tutorials';

const globalWhiteList = [
  '1) Start 1',
  '1) Start 2',
  '1) Fork 1',
  '2) Fork 2',
  '3) Fork 3',
  '4) Fork 4',
  '1) Preflight 4',
  '2) Preflight 5',
  '3) Preflight 6',
  '4) Preflight 7',
  '5) Preflight 8',
  '6) Preflight 9',
  '7) Preflight 10',
  '8) Preflight 11',
  '9) Preflight 12',
  '10) Preflight 13',
  '11) Preflight 14',
  '12) Preflight 15',
  '13) Preflight 16',
  '14) Preflight 17',
  'Download Code',
  'Upload Code',
  'Pick a Game',
  'Horse Game Tutorial',
  'Run Game Tutorial',
  'Soccer Game Tutorial',
  'Zombie Game Tutorial',
  'blocks',
  'downloads',
  'images',
  'splitScreen'
];

// White list subdirectories.
const allowedSubDirs = ['Run Game Tutorial', 'Soccer Game Tutorial', 'Zombie Game Tutorial'];
allowedSubDirs.forEach(subDir => {
  Object.keys(tutorials[subDir])
    .map(key => `${subDir}.${key}`)
    .map(item => globalWhiteList.push(item));
});

/* ===================
 * === Items Hooks ===
 * =================== */

export const getLiveCheckOffData = page => {
  const [checkOff, setCheckOff] = useState(null);
  const ref = useMemo(
    () =>
      db
        .collection('checkOffs')
        .where('parentId', '==', auth.currentUser?.uid)
        .where('page', '==', page),
    [page, auth.currentUser]
  );
  useEffect(liveCheckOffDataEffect(ref, setCheckOff), [ref]);
  return checkOff;
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
  locked
    ? useMemo(() => checkItems([...globalWhiteList, ...whiteList], items), [items, whiteList])
    : items;

export const useFlatItems = items => useMemo(() => flattenItems(items), [items]);

export const useFlatUnlockedItems = (items, locked, whiteList) =>
  useFlatItems(useUnlockedItems(items, locked, whiteList));

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const liveCheckOffDataEffect = onSnapshotDataEffectBase(
  true,
  snap => snap.docs.map(d => toData(d))[0] || null
);
