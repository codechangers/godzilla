export const phoneValidation = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
export const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const birthDateValidation = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/; // eslint-disable-line

export const URL = 'http://localhost:3000';

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

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dataMemberToValidation = {
  name: () => '',
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
  password: state =>
    state.password.length < 8 ? 'Password must be at least 8 characters long' : '',
  confirmPassword: state =>
    state.password === state.confirmPassword ? '' : 'Password fields do not match',
  locationName: () => '',
  locationAddress: () => '',
  daysOfWeek: state => (state.daysOfWeek.length > 0 ? '' : 'Must select at least one week day'),
  startAge: state => (state.startAge > 0 ? '' : 'This field may not be empty'),
  endAge: state => {
    if (Number(state.endAge) >= Number(state.startAge)) {
      return state.endAge > 0 ? '' : 'This field may not be empty';
    }
    return "Max Age can't be less than Min";
  },
  minStudents: state => (state.minStudents > 0 ? '' : 'This field may not be empty'),
  maxStudents: state => {
    if (Number(state.maxStudents) >= Number(state.minStudents)) {
      return state.maxStudents > 0 ? '' : 'This field may not be empty';
    }
    return "Max Students can't be less than Min";
  }
};
