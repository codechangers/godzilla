import { useMemo } from 'react';

const globalWhiteList = ['welcome', 'start'];

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
