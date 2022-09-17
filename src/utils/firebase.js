import { initializeApp } from 'firebase/app';
import { collection, doc, initializeFirestore } from 'firebase/firestore';
import { initializeAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// All configuration variables are pulled from a .env file
const app = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export const db = doc(process.env.REACT_APP_ENV, collection('env', initializeFirestore(app, {})));
export const auth = initializeAuth(app);

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  return signInWithPopup(auth, provider);
};

export { Timestamp } from 'firebase/firestore';
export { GoogleAuthProvider } from 'firebase/auth';
