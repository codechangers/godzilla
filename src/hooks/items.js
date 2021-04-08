import { useMemo } from 'react';

const globalWhiteList = [
  'welcome',
  '1) Full Day Overview',
  '2) Fork Project in Repl',
  '3) Setup Server',
  '4) Pick a Game',
  'downloads',
  'images',
  'splitScreen',
  'Run Game Tutorial.1) Runner',
  'Run Game Tutorial.2) Runner',
  'Run Game Tutorial.3) Runner',
  'Run Game Tutorial.4) Runner',
  'Run Game Tutorial.5) Runner',
  'Run Game Tutorial.6) Runner',
  'Run Game Tutorial.7) Runner',
  'Run Game Tutorial.8) Runner',
  'Run Game Tutorial.9) Runner',
  'Run Game Tutorial.10) Runner',
  'Run Game Tutorial.11) Runner',
  'Run Game Tutorial.12) Runner',
  'Run Game Tutorial.14) Runner',
  'Run Game Tutorial.16) Runner',
  'Run Game Tutorial.17) Runner',
  'Run Game Tutorial.18) Runner',
  'Run Game Tutorial.19) Runner',
  'Run Game Tutorial.20) Runner',
  'Run Game Tutorial.21) Runner',
  'Run Game Tutorial.22) Runner',
  'Run Game Tutorial.23) Runner',
  'Run Game Tutorial.24) Runner',
  'Run Game Tutorial.25) Runner',
  'Run Game Tutorial.26) Runner',
  'Run Game Tutorial.27) Runner',
  'Run Game Tutorial.28) Runner',
  'Run Game Tutorial.29) Runner',
  'Run Game Tutorial.30) Runner',
  'Run Game Tutorial.31) Runner',
  'Run Game Tutorial.32) Runner',
  'Run Game Tutorial.33) Runner',
  'Soccer Game Tutorial.1) Soccer',
  'Soccer Game Tutorial.2) Soccer',
  'Soccer Game Tutorial.3) Soccer',
  'Soccer Game Tutorial.4) Soccer',
  'Soccer Game Tutorial.5) Soccer',
  'Soccer Game Tutorial.6) Soccer',
  'Soccer Game Tutorial.7) Soccer',
  'Soccer Game Tutorial.8) Soccer',
  'Soccer Game Tutorial.9) Soccer',
  'Soccer Game Tutorial.10) Soccer',
  'Soccer Game Tutorial.11) Soccer',
  'Soccer Game Tutorial.12) Soccer',
  'Soccer Game Tutorial.13) Soccer',
  'Soccer Game Tutorial.14) Soccer',
  'Soccer Game Tutorial.15) Soccer',
  'Soccer Game Tutorial.16) Soccer',
  'Soccer Game Tutorial.17) Soccer',
  'Soccer Game Tutorial.18) Soccer',
  'Soccer Game Tutorial.19) Soccer',
  'Soccer Game Tutorial.20) Soccer',
  'Soccer Game Tutorial.21) Soccer',
  'Soccer Game Tutorial.22) Soccer',
  'Soccer Game Tutorial.23) Soccer',
  'Soccer Game Tutorial.24) Soccer',
  'Soccer Game Tutorial.25) Soccer',
  'Soccer Game Tutorial.26) Soccer',
  'Soccer Game Tutorial.27) Soccer',
  'Soccer Game Tutorial.28) Soccer',
  'Soccer Game Tutorial.29) Soccer',
  'Soccer Game Tutorial.30) Soccer',
  'Soccer Game Tutorial.31) Soccer',
  'Soccer Game Tutorial.32) Soccer',
  'Soccer Game Tutorial.33) Soccer',
  'Soccer Game Tutorial.34) Soccer',
  'Soccer Game Tutorial.35) Soccer',
  'Soccer Game Tutorial.36) Soccer',
  'Soccer Game Tutorial.37) Soccer',
  'Soccer Game Tutorial.38) Soccer',
  'Soccer Game Tutorial.39) Soccer',
  'Soccer Game Tutorial.40) Soccer',
  'Soccer Game Tutorial.41) Soccer',
  'Soccer Game Tutorial.42) Soccer',
  'Soccer Game Tutorial.43) Soccer',
  'Soccer Game Tutorial.44) Soccer',
  'Soccer Game Tutorial.45) Soccer',
  'Soccer Game Tutorial.46) Soccer',
  'Soccer Game Tutorial.47) Soccer',
  'Soccer Game Tutorial.48) Soccer',
  'Soccer Game Tutorial.49) Soccer',
  'Soccer Game Tutorial.50) Soccer',
  'Soccer Game Tutorial.51) Soccer',
  'Soccer Game Tutorial.52) Soccer',
  'Zombie Game Tutorial.1) Zombies',
  'Zombie Game Tutorial.2) Zombies',
  'Zombie Game Tutorial.3) Zombies',
  'Zombie Game Tutorial.4) Zombies',
  'Zombie Game Tutorial.5) Zombies',
  'Zombie Game Tutorial.6) Zombies',
  'Zombie Game Tutorial.9) Zombies',
  'Zombie Game Tutorial.10) Zombies',
  'Zombie Game Tutorial.11) Zombies',
  'Zombie Game Tutorial.12) Zombies',
  'Zombie Game Tutorial.13) Zombies',
  'Zombie Game Tutorial.14) Zombies',
  'Zombie Game Tutorial.15) Zombies',
  'Zombie Game Tutorial.16) Zombies',
  'Zombie Game Tutorial.17) Zombies',
  'Zombie Game Tutorial.18) Zombies',
  'Zombie Game Tutorial.19) Zombies',
  'Zombie Game Tutorial.20) Zombies',
  'Zombie Game Tutorial.21) Zombies',
  'Zombie Game Tutorial.22) Zombies',
  'Zombie Game Tutorial.23) Zombies',
  'Zombie Game Tutorial.24) Zombies',
  'Zombie Game Tutorial.25) Zombies',
  'Zombie Game Tutorial.26) Zombies',
  'Zombie Game Tutorial.27) Zombies',
  'Zombie Game Tutorial.28) Zombies',
  'Zombie Game Tutorial.29) Zombies',
  'Zombie Game Tutorial.30) Zombies',
  'Zombie Game Tutorial.31) Zombies',
  'Zombie Game Tutorial.32) Zombies',
  'Zombie Game Tutorial.33) Zombies',
  'Zombie Game Tutorial.34) Zombies',
  'Zombie Game Tutorial.35) Zombies',
  'Zombie Game Tutorial.36) Zombies',
  'Zombie Game Tutorial.37) Zombies',
  'Zombie Game Tutorial.38) Zombies',
  'Zombie Game Tutorial.39) Zombies',
  'Zombie Game Tutorial.40) Zombies',
  'Zombie Game Tutorial.41) Zombies',
  'Zombie Game Tutorial.42) Zombies',
  'Zombie Game Tutorial.43) Zombies',
  'blocks.addAStore',
  'blocks.addResources',
  'blocks.additionalInputs',
  'blocks.allAboutAnimations',
  'blocks.connectionsHelp',
  'blocks.gameBoundsAndBackground',
  'blocks.gettingStarted',
  'blocks.howToCollide',
  'blocks.loginAndHowToPlay',
  'blocks.movingForward',
  'blocks.newCharacterSet',
  'blocks.newLocationsSet',
  'blocks.setupItems',
  'blocks.setupLeaderboard',
  'blocks.useBarrier',
  'blocks.useItems'
];

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
