export const phoneValidation = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
export const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const birthDateValidation = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/; // eslint-disable-line

export const URL = process.env.REACT_APP_REDIR_URL;
export const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
export const STRIPE_CID = process.env.REACT_APP_STRIPE_CID;

const bpValues = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};
const getSizes = () => {
  const up = {};
  const down = {};
  const keys = Object.keys(bpValues);
  keys.forEach((size, i) => {
    up[size] = `@media (min-width: ${bpValues[size]}px)`;
    if (i < keys.length - 1) {
      down[size] = `@media (max-width: ${bpValues[keys[i + 1]]}px)`;
    }
  });
  return { up, down };
};
export const breakpoints = {
  values: bpValues,
  ...getSizes()
};
export const paletteType = 'dark';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const programTypeToText = {
  contest: 'Code Contest'
};

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const fullWeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const STATUS = {
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  PENDING: 'PENDING'
};

/**
 * Games Globals
 */
export const gameTypes = {
  '': '',
  default: 'Default Template',
  runner: 'Run Game',
  soccer: 'Soccer Game',
  zombie: 'Zombie Game'
};

export const gameNames = /^[a-z]+$/;

export const gamesPerKid = 1;

export const serverReqs = ['RESTART', 'STOP'];

export const GREEN = '#22AE0C';

export const defaultStatus = {
  download: 0,
  build: 0
};

export const gameNameBlackList = ['www'];

/**
 * Global Data Memeber Validation.
 */
export const dataMemberToValidation = {
  name: () => '',
  programType: () => '',
  description: () => '',
  fName: () => '',
  lName: () => '',
  email: state =>
    emailValidation.test(String(state.email).toLowerCase()) ? '' : 'Invalid Email Address',
  phone: state => (phoneValidation.test(state.phone) ? '' : 'Invalid Phone Number'),
  canText: () => '',
  birthDate: state =>
    state.birthDate instanceof Date ? '' : 'Invalid Birthdate, use format MM/DD/YYYY',
  currentSchool: () => '',
  currentGrade: () => '',
  shirtSize: () => '',
  gender: () => '',
  whyTeach: () => '',
  prevExp: () => '',
  region: () => '',
  location: () => '',
  address: () => '',
  aboutMe: () => '',
  privacyCode: () => '',
  waiverURL: () => '',
  password: state =>
    state.password.length < 8 ? 'Password must be at least 8 characters long' : '',
  confirmPassword: state =>
    state.password === state.confirmPassword ? '' : 'Password fields do not match',
  locationName: () => '',
  locationAddress: () => '',
  price: state =>
    !Number.isNaN(Number(state.price)) && Number(state.price) >= 10
      ? ''
      : 'Invalid price, must be at least $10',
  startDate: state =>
    state.startDate !== null && state.startDate instanceof Date ? '' : 'Invalid Start Date',
  endDate: state => {
    if (state.endDate !== null && state.endDate instanceof Date) {
      return state.endDate >= state.startDate ? '' : "End Date can't be before the Start Date";
    }
    return 'Invalid End Date';
  },
  startTime: state =>
    state.startTime !== null && state.startTime instanceof Date ? '' : 'Invalid Start Time',
  endTime: state => {
    if (state.endTime !== null && state.endTime instanceof Date) {
      return state.endTime >= state.startTime ? '' : "End Time can't be before the Start Time";
    }
    return 'Invalid End Time';
  },
  daysOfWeek: state => (state.daysOfWeek.length > 0 ? '' : 'Must select at least one week day'),
  startAge: state =>
    !Number.isNaN(Number(state.startAge)) && Number(state.startAge) > 0
      ? ''
      : 'Invalid Minimum Age',
  endAge: state => {
    if (Number(state.endAge) >= Number(state.startAge)) {
      return !Number.isNaN(Number(state.endAge)) && Number(state.endAge) > 0
        ? ''
        : 'Invalid Maximum Age';
    }
    return "Max Age can't be less than Min";
  },
  minStudents: state =>
    !Number.isNaN(Number(state.minStudents)) && Number(state.minStudents) > 0
      ? ''
      : 'Invalid Minimum number of Students',
  maxStudents: state => {
    if (Number(state.maxStudents) >= Number(state.minStudents)) {
      return !Number.isNaN(Number(state.maxStudents)) && Number(state.maxStudents) > 0
        ? ''
        : 'Invalid Maximum number of Students';
    }
    return "Max Students can't be less than Min";
  }
};
