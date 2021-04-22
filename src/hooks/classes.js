import { useState, useEffect, useMemo } from 'react';
import { getDataEffectBase } from '../utils/effectBases';
import { toData } from '../utils/helpers';
import { db } from '../utils/firebase';

/* ===================
 * === Class Hooks ===
 * =================== */

export const useIdClass = id => {
  const [cls, setCls] = useState(null);
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const ref = useMemo(() => db.collection('classes').doc(id), [id]);
  const checkClass = ([classExists, data]) => {
    if (classExists) setCls(data);
    setExists(classExists);
  };
  useEffect(classExistsEffect(ref, checkClass, setLoading), [ref]);
  return [exists, cls, loading];
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const classExistsEffect = getDataEffectBase(true, doc => [doc.exists, toData(doc)]);
