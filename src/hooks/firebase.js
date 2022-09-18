import { useEffect, useMemo, useState } from 'react';
import { collection, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';

/**
 * Generate a live data hook for a given firebase collection.
 */
export const liveDocumentHookForCollection = collectionName => documentId => {
  const docRef = useMemo(() => doc(documentId, collection(collectionName, db)), [documentId]);
  return useDocumentReferenceLiveData(docRef);
};

/**
 * Handle data snapshots for a firebase document.
 */
export const useDocumentReferenceLiveData = documentRef => {
  const [data, setData] = useState({});
  useEffect(liveDocumentEffect(documentRef, setData), [documentRef]);
  return data;
};

const liveDocumentEffect = onSnapshotDataEffectBase();
