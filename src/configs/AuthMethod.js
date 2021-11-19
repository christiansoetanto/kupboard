import firebase from './firebase-config';

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
// export const appleProvider = firebase.auth.AppleAuthProvider();
