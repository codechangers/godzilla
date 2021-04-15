export const types = {
  '': '',
  default: 'Default Template',
  soccer: 'Soccer Game',
  ninja: 'Ninja Game'
};

export const names = /^[a-z]+$/;

export const authErrors = {
  'auth/user-not-found': 'Email or Password is Incorrect!',
  'auth/wrong-password': 'Email or Password is Incorrect!',
  'auth/invalid-email': 'Email format is Invalid!',
  'auth/email-already-in-use': 'There is already an account with that email.',
  'auth/weak-password': 'Weak Password! Use at least 6 characters.'
};

export const serverReqs = ['RESTART', 'STOP'];

export const GREEN = '#22AE0C';

export const defaultStatus = {
  download: 0,
  build: 0
};
