// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeu_X_bjM7cY_dUNL0E2H2RIhVoiSY8fk",
  authDomain: "vihco-91d29.firebaseapp.com",
  projectId: "vihco-91d29",
  storageBucket: "vihco-91d29.appspot.com",
  messagingSenderId: "878230632373",
  appId: "1:878230632373:web:448753fdcf49d331a58bfc",
  measurementId: "G-8L64HHZFTS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const USERS_REF = 'users';
export { auth }

//const analytics = getAnalytics(app);


