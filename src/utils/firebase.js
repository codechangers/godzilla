import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// All configuration variables are pulled from a .env file

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);
export const { Timestamp } = firebase.firestore;
export const { GoogleAuthProvider } = firebase.auth;
export const db = firebase
  .firestore()
  .collection('env')
  .doc(process.env.REACT_APP_ENV);
export const ref = firebase
  .storage()
  .ref()
  .child(process.env.REACT_APP_ENV);
export const auth = firebase.auth();
export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  auth.signInWithPopup(provider).catch(err => {
    console.log(err);
  });
};
