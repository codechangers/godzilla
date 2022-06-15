const {uniqueNamesGenerator, adjectives, colors, animals} = require("unique-names-generator");
const {firestore} = require("../utils/admin");

/**
 * Get a random id of N words.
 */
const getId = (length) =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length,
  });

/**
 * A backup random-ish id.
 */
const backupId = () => `backup-id${Math.floor(1000 + Math.random() * 9000)}`;

/**
 * Get an id that is unique to this environment.
 */
const getLearnId = ({params: {env}}) =>
  Promise.all(
      [2, 2, 3].map(getId).map((id) =>
        firestore
            .collection(`env/${env}/learnIds`)
            .doc(`${id}`)
            .get(),
      ),
  )
      .then((ids) => ids.filter((id) => !id.owner))
      .then((ids) => (ids.length > 0 ? ids[0] : backupId()))
      .catch((err) => {
        console.error(err);
        return backupId();
      });

/**
 * Assign a new learn id to a child.
 */
async function assignAccountId(snap, context) {
  const learnID = await getLearnId(context);
  if (learnID instanceof String) {
    await snap.ref.update({learnID});
  } else {
    await learnID.ref.set({owner: snap.ref});
    await snap.ref.update({learnID: learnID.id});
  }
}

/**
 * Generate the number of learn ids requested by the ticket.
 */
async function generateIds(snap, context) {
  const {count} = snap.data();
  const idDocs = await Promise.all(
      Array(count)
          .fill(context)
          .map(getLearnId),
  );
  await Promise.all(idDocs.map((d) => d.ref.set({owner: snap.ref})));
  await snap.ref.set({learnIds: idDocs.map((d) => d.id), completed: true});
}

module.exports = {assignAccountId, generateIds};
