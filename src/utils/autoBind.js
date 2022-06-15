/* eslint-disable */
const autoBind = self => {
  Object.getOwnPropertyNames(self.__proto__).forEach(method => {
    if (excludedReactMethods.indexOf(method) === -1) {
      self[method] = self[method].bind(self);
    }
  });
  return self;
};

export const excludedReactMethods = [
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'render',
  'getSnapshotBeforeUpdate',
  'componentDidMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch',
  'setState',
  'forceUpdate'
];

export default autoBind;
