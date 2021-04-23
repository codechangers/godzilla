import { useState, useEffect } from 'react';
import { getDataEffectBase, onSnapshotDataEffectBase } from '../utils/effectBases';

/* ========================
 * === Promo Code Hooks ===
 * ======================== */

/**
 * Get the data of a list of promo codes.
 */
export const usePromoCodes = promos => {
  const [promoData, setPromoData] = useState([]);
  useEffect(promoDataEffect(promos, setPromoData), [promos]);
  return promoData;
};

/**
 * Subscribe to the data of a list of promo codes.
 */
export const useLivePromoCodes = promos => {
  const [promoData, setPromoData] = useState([]);
  useEffect(livePromoDataEffect(promos, setPromoData), [promos]);
  return promoData;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

/**
 * Fetch the data of a list of references once.
 */
const promoDataEffect = getDataEffectBase(false);

/**
 * Subscribe to the data of a list of references.
 */
const livePromoDataEffect = onSnapshotDataEffectBase(false);
