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

export const getDoubleDigits = number => (number > 9 ? `${number}` : `0${number}`);

export const getDateFromTimestamp = timestamp => new Date(timestamp.seconds * 1000);

export const getMMDDYYYY = date => `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

export const getHrMn = date => {
  const past12 = date.getHours() / 12 > 1;
  return `${getDoubleDigits(past12 ? date.getHours() - 12 : date.getHours())}:${getDoubleDigits(
    date.getMinutes()
  )} ${past12 ? 'PM' : 'AM'}`;
};

export const getWeekDays = daysOfWeek => {
  let weekDays = '';
  daysOfWeek.forEach(day => {
    weekDays += `${day}, `;
  });
  weekDays = weekDays.substring(0, weekDays.length - 2);
  return weekDays;
};

export const getDate = timestamp => getMMDDYYYY(getDateFromTimestamp(timestamp));

export const getTime = timestamp => getHrMn(getDateFromTimestamp(timestamp));
