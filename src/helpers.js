import { dataMemberToValidation, months, weekDays } from './globals';

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

export const getMonthDDYYYY = date =>
  `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

export const getHrMn = date => {
  const past12 = date.getHours() / 12 > 1;
  return `${getDoubleDigits(past12 ? date.getHours() - 12 : date.getHours())}:${getDoubleDigits(
    date.getMinutes()
  )} ${past12 ? 'PM' : 'AM'}`;
};

export const getWeekDays = daysOfWeek => {
  let wDays = '';
  daysOfWeek.forEach(day => {
    wDays += `${day}, `;
  });
  wDays = wDays.substring(0, wDays.length - 2);
  return wDays;
};

export const calcSessions = cls => {
  const { startDate, endDate, daysOfWeek } = cls;
  const start = getDateFromTimestamp(startDate);
  let count = 0;
  while (start.getTime() / 1000 <= endDate.seconds) {
    if (daysOfWeek.includes(weekDays[start.getDay()])) {
      count += 1;
    }
    start.setDate(start.getDate() + 1);
  }
  return count;
};

export const getDate = timestamp => getMMDDYYYY(getDateFromTimestamp(timestamp));

export const getDateString = timestamp => getMonthDDYYYY(getDateFromTimestamp(timestamp));

export const getTime = timestamp => getHrMn(getDateFromTimestamp(timestamp));
