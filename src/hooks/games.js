import { useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { toData } from '../utils/helpers';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';

/* ===================
 * === Games Hooks ===
 * =================== */

/**
 * Get the data of each game reference given.
 */
export const useGames = gameRefs => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleError = () => {
    setGames([]);
    setLoading(false);
  };
  useEffect(gamesDataEffect(gameRefs, setGames, setLoading, handleError), [gameRefs]);
  return [games, loading];
};

/**
 * Subscribe to the data of each of the game references given.
 */
export const useLiveGames = gameRefs => {
  const [games, setGames] = useState([]);
  const handleError = () => setGames([]);
  useEffect(liveGamesDataEffect(gameRefs, setGames, handleError), [gameRefs]);
  return games;
};

/**
 * Subscribe to the current user's games.
 */
export const useUserGames = () => {
  const [games, setGames] = useState([]);
  useEffect(
    () =>
      auth.currentUser?.uid
        ? db
            .collection('games')
            .where('userID', '==', auth.currentUser.uid)
            .onSnapshot(snap => setGames(snap.docs.map(toData)))
        : () => {},
    [auth.currentUser]
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

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const gamesDataEffect = getDataEffectBase(false);
const liveGamesDataEffect = onSnapshotDataEffectBase(false);
