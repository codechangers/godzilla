import { useState, useEffect, useMemo } from 'react';
import { getDataEffectBase } from '../utils/effectBases';
import { db, auth } from '../utils/firebase';
import { toData } from '../utils/helpers';

/* =====================
 * === Account Hooks ===
 * ===================== */

/**
 * Get the data of a user account given the account type. This hook will verify
 * that the current user has access to the account before returning any data.
 *
 * _Optional:_ Set `listenToUpdates` to `true` to listen for snapshots on a valid account.
 */
export const useAccountData = (type, listenToUpdates = false) => {
  const [account, setAccount] = useState(null);
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useAccountRef(type);
  let listener;
  const checkAccount = ([accountExists, data]) => {
    if (accountExists) setAccount(data);
    setExists(accountExists);
    if (listener) listener();
    if (accountExists && listenToUpdates) {
      listener = ref.onSnapshot(doc => setAccount(toData(doc)));
    }
  };
  const handleError = () => {
    setExists(false);
    setAccount(null);
    setLoading(false);
  };
  useEffect(accountExistsEffect(ref, checkAccount, setLoading, handleError), [ref]);
  return [exists, account, loading];
};

/**
 * Get a firestore reference to the users given type of account.
 */
export const useAccountRef = type =>
  useMemo(() => db.collection(type).doc(auth.currentUser?.uid || 'none'), [auth.currentUser, type]);

/**
 * Fetch the data of an account and return an array of if the document exists and it's data.
 */
const accountExistsEffect = getDataEffectBase(true, doc => [doc.exists, toData(doc)]);
