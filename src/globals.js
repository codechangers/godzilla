export const phoneValidation = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // eslint-disable-line
export const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
export const birthDateValidation = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/; // eslint-disable-line

export const dataMemberToValidation = {
  name: () => '',
  fName: () => '',
  lName: () => '',
  email: state =>
    emailValidation.test(String(state.email).toLowerCase()) ? '' : 'Invalid Email Address',
  phone: state => (phoneValidation.test(state.phone) ? '' : 'Invalid Phone Number'),
  canText: () => '',
  birthDate: state =>
    birthDateValidation.test(String(state.birthDate))
      ? ''
      : 'Invalid Birthdate, use format MM/DD/YYYY',
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
    state.password === state.confirmPassword ? '' : 'Password fields do not match'
};
