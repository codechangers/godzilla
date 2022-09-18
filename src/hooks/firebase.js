import { useEffect, useMemo, useState } from 'react';
import { collection, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';

/**
 * Generate a hook that will handle snapshots for a firebase document.
 */
export const liveDocumentHook = collectionName => documentId => {
  const [data, setData] = useState({});
  const docRef = useMemo(() => doc(documentId, collection(collectionName, db)), [documentId]);
  useEffect(liveDocumentEffect(docRef, setData), [docRef]);
  return data;
};

const liveDocumentEffect = onSnapshotDataEffectBase();
