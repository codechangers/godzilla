import { dataMemberToValidation } from './globals';

/*
 * For all functions that need to be binded to a component, ES5 functions must be used,
 * because ES6 arrow function scope binding is not re-assignable
 *
 * Functions should be bound in the constructor method:
 *  ex. this.functionName = functionName;
 *
 * Reference:
 * https://stackoverflow.com/questions/33308121/can-you-bind-arrow-functions
 */

// Must bind to component
export function getUserData(fields) {
  return Object.keys(this.state)
    .filter(key => fields.includes(key))
    .reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = this.state[key];
      return newObj;
    }, {});
}

// Must bind to component
export function validateFields(fields) {
  const { errors } = this.state;
  let formValid = true;
  Object.keys(this.getUserData(fields)).forEach(field => {
    if (this.state[field] === '') {
      errors[field] = 'This field may not be empty';
      formValid = false;
    } else {
      const valid = dataMemberToValidation[field](this.state);
      errors[field] = valid;
      if (valid !== '') formValid = false;
    }
  });
  this.setState({ errors });
  return formValid;
}

export const getErrorStatus = error => typeof error === 'string' && error.length > 0;
