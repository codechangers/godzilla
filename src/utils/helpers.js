import { dataMemberToValidation, months, weekDays, STATUS, paletteType } from './globals';

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

export const atLeastZero = x => (x > 0 ? x : 0);
export const decimalByte = x => atLeastZero(x < 255 ? x : 255);
export const themed = x => decimalByte(paletteType === 'dark' ? x : 255 - x);

export const rgba = (red, green, blue, alpha) =>
  `rgba(${themed(red)}, ${themed(green)}, ${themed(blue)}, ${alpha})`;

export const rgb = (red, green, blue) => rgba(red, green, blue, 1);

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

export const getExactDateTime = (date, time) => {
  const dateObj = new Date(date.seconds * 1000);
  const timeObj = new Date(time.seconds * 1000);
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
    timeObj.getHours(),
    timeObj.getMinutes(),
    0, // Seconds
    0 // Milliseconds
  );
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

export const getStatus = account => {
  if (account.isVerrified) {
    return STATUS.ACCEPTED;
  }
  if (account.isDeclined) {
    return STATUS.DECLINED;
  }
  return STATUS.PENDING;
};

export const toData = doc => ({ ...doc.data(), id: doc.id, ref: doc.ref });

// ===============================
// Page data manipulation helpers.
// ===============================

/**
 * Check the given `value` object against the given `unlocked` whitelist.
 * Return only the allowed values.
 */
export const filterPages = (unlocked, value, prefix = '') => {
  const newValue = {};
  Object.entries(value).forEach(([key, val]) => {
    if (typeof val === 'string' && unlocked.includes(prefix + key)) newValue[key] = val;
    else if (typeof val !== 'string') {
      const nextUp = filterPages(unlocked, val, `${prefix}${key}.`);
      if (Object.keys(nextUp).length > 0) newValue[key] = nextUp;
    }
  });
  return newValue;
};

/**
 * Flatten a multi-dimentional object into a single array of pages.
 */
export const flattenPages = (fItems, prefix = '') => {
  const flattened = [];
  Object.entries(fItems).forEach(([key, value]) => {
    const item = prefix + key;
    if (typeof value === 'string') flattened.push(item);
    else flattened.push(...flattenPages(value, `${item}.`));
  });
  return flattened;
};
