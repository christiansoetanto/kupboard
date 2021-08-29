// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABdcBRd375t-gTz3wz9rcJ_wP_y7i-PVQ",
  authDomain: "kupboard-firebase.firebaseapp.com",
  projectId: "kupboard-firebase",
  storageBucket: "kupboard-firebase.appspot.com",
  messagingSenderId: "1096655430343",
  appId: "1:1096655430343:web:b9f936e76f78999e0a14e2",
  measurementId: "G-TPKQJMZB30"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase