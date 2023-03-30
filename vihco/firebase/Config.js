// Import the functions you need from the SDKs you need
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore } from 'firebase/firestore'
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = getAnalytics(app);
export { auth, firestore };
//const app = initializeApp(firebaseConfig);
//const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})
export const db = getFirestore(app);
export const USERS_REF = 'users';
//export { auth }

