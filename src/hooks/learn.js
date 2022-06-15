import { useEffect, useState } from 'react';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';

/* ===================
 * === Learn Hooks ===
 * =================== */

/**
 * Subscribe to the status of a learn id generator ticket.
 */
export const useLiveTicketStatus = ticketRef => {
  const [completed, setCompleted] = useState(false);
  useEffect(liveTicketStatusEffect(ticketRef, setCompleted), [ticketRef]);
  return completed;
};

/**
 * Get the learn ids for a given generator ticket.
 */
export const useLearnIds = ticketRef => {
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(learnIdsEffect(ticketRef, setIds, setLoading), [ticketRef]);
  return [ids, loading];
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const learnIdsEffect = getDataEffectBase(true, doc => doc.data().learnIds || []);
const liveTicketStatusEffect = onSnapshotDataEffectBase(true, doc => doc.data().completed || false);
