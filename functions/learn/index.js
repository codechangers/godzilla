const admin = require('firebase-admin');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

/**
 * Get a random id of N words.
 */
const getId = length =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length
  });

/**
 * A backup random-ish id.
 */
const backupId = () => `backup-id${Math.floor(1000 + Math.random() * 9000)}`;

/**
 * Get an id that is unique to this environment.
 */
const getLearnId = ({ params: { env } }) =>
  Promise.all(
    [2, 2, 3].map(getId).map(id =>
      admin
        .firestore()
        .doc(`env/${env}/learnIds/${id}`)
        .get()
    )
  )
    .then(ids => ids.filter(id => id.exists))
    .then(ids => (ids.length > 0 ? ids[0] : backupId()))
    .catch(err => {
      console.error(err);
      return failId();
    });

/**
 * Assign a new learn id to a child.
 */
async function assignAccountId(snap, context) {
  const learnIdSnap = await getLearnId(context);
  await learnIdSnap.ref.set({ owner: snap.ref });
  await snap.ref.update({ learnID: learnIdSnap.id });
}

module.exports = { assignId };
