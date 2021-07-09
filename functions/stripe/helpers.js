/**
 * Round a given number up to zero.
 */
const atLeastZero = num => (num > 0 ? num : 0);

/**
 * Register the given kids for the given class.
 */
async function registerForClass(classRef, kidsToRegister, description = '') {
  // Save kids to class.children list.
  const classDoc = await classRef.get();
  const currentRegisrations = classDoc.data().children || [];
  await classRef.update({ children: [...currentRegisrations, ...kidsToRegister] });
  // Save class to kids.classes lists.
  Promise.all(
    kidsToRegister.map(async kid => {
      const kidDoc = await kid.get();
      const currentClasses = kidDoc.data().classes || [];
      await kid.update({ classes: [...currentClasses, classRef] });
    })
  );
  console.log('Successfully Handled Registration Payment!', description);
}

// Custom error messages.
const UnwrapMessages = [
  'This key is missing from the snapshot!',
  'This key has a value of null but is not listed in the canBeNull whitelist!',
  'This key has a reference to a document that does not exist!',
  'This data memeber is either not present or null!'
];

// Custom error class.
class UnwrapError extends Error {
  constructor(message, stage, key, value) {
    super(message);
    this.key = key;
    this.value = value;
    this.stage = stage;
  }
}

exports = { atLeastZero, registerForClass, UnwrapMessages, UnwrapError };
