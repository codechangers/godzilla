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
  const past12 = date.getHours() / 12 >= 1;
  let hours = getDoubleDigits(past12 ? date.getHours() - 12 : date.getHours());
  if (date.getHours() % 12 === 0) hours = '12';
  return `${hours}:${getDoubleDigits(date.getMinutes())} ${past12 ? 'PM' : 'AM'}`;
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

export const getAgeFromBirthday = bDay => {
  const today = new Date().getTime() / 1000;
  const yearSecs = 31557600;
  return Math.floor((today - bDay.seconds) / yearSecs);
};

export const getDate = timestamp => getMMDDYYYY(getDateFromTimestamp(timestamp));

export const getDateString = timestamp => getMonthDDYYYY(getDateFromTimestamp(timestamp));

export const getTime = timestamp => getHrMn(getDateFromTimestamp(timestamp));

export const getOrdinal = int => {
  const string = `${int}`;
  const ordinals = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd',
    4: 'th',
    5: 'th',
    6: 'th',
    7: 'th',
    8: 'th',
    9: 'th'
  };
  return string + ordinals[string[string.length - 1]];
};
