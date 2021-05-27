import { useState, useEffect, useMemo } from 'react';
import { toData } from '../utils/helpers';
import { db, auth } from '../utils/firebase';
import { onSnapshotDataEffectBase } from '../utils/effectBases';

/* ===================
 * === Pages Hooks ===
 * =================== */

/**
 * This will subscribe to all check offs that the current user has access to.
 * It allows you to pass filters in to get only check offs that you need.
 *
 * Note: When calling this from "teacherland" you need to pass `true` as the
 * second parameter to get the proper results.
 */
export const getFilteredLiveCheckOffsData = (applyFilter = a => a, forTeacher = false) => {
  const [checkOffs, setCheckOffs] = useState([]);
  const userType = forTeacher ? 'teacherId' : 'parentId';
  const refs = useMemo(
    () =>
      auth.currentUser?.uid
        ? applyFilter(db.collection('checkOffs').where(userType, '==', auth.currentUser.uid))
        : () => {},
    [auth.currentUser]
  );
  const handleError = () => setCheckOffs([]);
  useEffect(liveCheckOffListDataEffect(refs, setCheckOffs, handleError), [refs]);
  return checkOffs;
};

/**
 * This will subscribe to all tutorial selections for a given child and class.
 * Theoretically this should only be a single document, but it will not fault
 * if there are multiple.
 */
export const getLiveTutorialSelection = (childId, classId) => {
  const [selection, setSelection] = useState(null);
  const refs = useMemo(
    () =>
      auth.currentUser?.uid
        ? db
            .collection('tutorialSelections')
            .where('parentId', '==', auth.currentUser.uid)
            .where('childId', '==', childId)
            .where('classId', '==', classId)
        : () => {},
    [auth.currentUser]
  );
  const handleError = () => setSelection('');
  useEffect(liveTutorialSelectionDataEffect(refs, setSelection, handleError), [refs]);
  return selection;
};

/* ===============================
 * === Custom Reusable Effects ===
 * =============================== */

const liveCheckOffListDataEffect = onSnapshotDataEffectBase(true, snap => snap.docs.map(toData));
const liveTutorialSelectionDataEffect = onSnapshotDataEffectBase(true, snap =>
  snap.docs.length > 0 ? toData(snap.docs[0]) : null
);
