import { useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { toData } from '../utils/helpers';

/**
 * Subscribe to the current user's games.
 */
export const useUserGames = () => {
  const [games, setGames] = useState([]);
  useEffect(
    () =>
      db
        .collection('games')
        .where('userID', '==', auth.currentUser.uid)
        .onSnapshot(snap => setGames(snap.docs.map(toData))),
    [auth.currentUser.uid]
  );
  return games;
};

/**
 * Subscribe to the stats of the given games.
 */
export const useGameStats = games => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    if (games.length > 0) {
      return db
        .collection('stats')
        .where(
          '__name__',
          'in',
          games.map(g => g.id)
        )
        .onSnapshot(snap => setStats(snap.docs.map(toData)));
    }
    return () => null;
  }, [games]);
  return stats;
};
