import { useMemo } from 'react';
import tutorials from '../resources/tutorials';

const globalWhiteList = [
  '1) Start 1',
  '1) Start 2',
  '1) Fork 1',
  '2) Fork 2',
  '3) Fork 3',
  '4) Fork 4',
  '5) Preflight 1',
  '6) Preflight 2',
  '7) Preflight 3',
  '8) Preflight 4',
  '9) Preflight 5',
  '9) Preflight 6',
  '9) Preflight 7',
  '9) Preflight 8',
  '9) Preflight 9',
  '9) Preflight 10',
  '9) Preflight 11',
  '9) Preflight 12',
  '9) Preflight 13',
  '9) Preflight 14',
  '9) Preflight 15',
  '9) Preflight 16',
  '9) Preflight 17',
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
