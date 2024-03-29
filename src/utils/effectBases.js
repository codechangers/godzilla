import { toData } from './helpers';

/**
 * getDataEffectBase is a wrapper function that produces a customized effect
 * that will handle toggling a loading state while retrieving the data of some firestore reference(s).
 *
 * @param {bool} single A way to toggle the logic to handle a single reference or an array of references.
 * By default `single` is `true` and will treat the input as a single reference.
 * @param {function} getter Manipulates the retrieved document(s) before they are saved.
 * By default `getter` will use the `toData` helper function from _src/utils/helpers.js_.
 * @returns {function} An effect function that will toggle a loading state while retrieving the data of some firestore reference(s) and saving that data with a given setter method.
 *
 * This function has a very specific use case, and should be used as follows:
 * ~~~
 * // Global Definition.
 * const newEffect = getDataEffectBase(single, getter);
 *
 * // Inside a component or hook.
 * useEffect(newEffect(input, setData, setLoading, handleError), [input]);
 * ~~~
 */
export const getDataEffectBase = (single = true, getter = toData) => (
  input,
  setData,
  setLoading,
  handleError = () => {}
) => () => {
  /**
   * This is how you are supposed to run async code in an effect.
   * See this github issue for details:
   * https://github.com/facebook/react/issues/14326#issuecomment-441680293
   */
  let safeSetData = setData;
  let safeSetLoading = setLoading;
  async function run() {
    try {
      safeSetLoading(true);
      let newData;
      if (single) newData = getter(await input.get());
      else newData = await Promise.all(input.map(async ref => getter(await ref.get())));
      safeSetData(newData);
      safeSetLoading(false);
    } catch (error) {
      handleError(error);
    }
  }
  run();
  return () => {
    safeSetData = () => {};
    safeSetLoading = () => {};
  };
};

/**
 * onSnapshotDataEffectBase is a wrapper function that produces a customized effect
 * that will handle creating snapshot listeners for a given array of firestore references.
 *
 * @param {bool} single A way to toggle the logic to handle a single reference or an array of references.
 * By default `single` is `true` and will treat the input as a single reference.
 * @param {function} getter Manipulates the snapshot document(s) before they are saved.
 * By default `getter` will use the `toData` helper function from _src/utils/helpers.js_.
 * @returns {function} An effect function that will setup snapshot listeners for each reference given and send the data back via a given setter method.
 *
 * This function has a very specific use case, and should be used as follows:
 * ~~~
 * // Global Definition.
 * const newEffect = onSnapshotDataEffectBase(single, getter);
 *
 * // Inside a component or hook.
 * useEffect(newEffect(input, setData, handleError), [input]);
 * ~~~
 */
export const onSnapshotDataEffectBase = (single = true, getter = toData) => (
  input,
  setData,
  handleError = () => {}
) => {
  let subs = [];
  return () => {
    const dataMap = {};
    const refs = single ? [input] : input;
    try {
      refs.forEach(ref => {
        const sub = ref.onSnapshot(doc => {
          dataMap[doc.id] = getter(doc);
          const values = Object.values(dataMap);
          setData(single ? values[0] : values);
        });
        subs.push(sub);
      });
    } catch (error) {
      handleError(error);
    }
    // Cleanup subscriptions.
    return () => {
      subs.forEach(sub => sub());
      subs = [];
    };
  };
};
