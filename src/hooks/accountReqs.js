import { useState, useEffect, useMemo } from 'react';
import { onSnapshotDataEffectBase } from '../utils/effectBases';
import { db } from '../utils/firebase';
import { toData } from '../utils/helpers';

/* =============================
 * === Account Request Hooks ===
 * ============================= */

/**
 * List to all requests created in a given account type's column.
 */
export const useAccountRequests = type => {
  const [reqs, setReqs] = useState([]);
  const [parents, setParents] = useState({});
  // Subscribe a collections docs.
  useEffect(() => db.collection(type).onSnapshot(snap => setReqs(snap.docs)), [type]);
  // Subscribe to parent data.
  useEffect(
    liveParentDataEffect(
      reqs.map(r => db.collection('parents').doc(r.id)),
      // Save parents to an object for easy retreival.
      parentData => {
        const newParents = {};
        parentData.forEach(p => {
          newParents[p.id] = p;
        });
        setParents(newParents);
      }
    ),
    [reqs]
  );
  // Merge parent data and request data.
  const accountReqs = useMemo(
    () =>
      reqs.length === Object.keys(parents).length
        ? reqs.map(r => ({ ...toData(r), parent: parents[r.id] }))
        : [],
    [reqs, parents]
  );
  return accountReqs;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const liveParentDataEffect = onSnapshotDataEffectBase(false);
