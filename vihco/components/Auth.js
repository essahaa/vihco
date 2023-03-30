import { Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, USERS_REF } from '../firebase/Config';

export const signUp = async (username, email, password) => {
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
         addNewUser(username, userCredential.user.email)
        })  
    .catch ((error) => {
    console.log('Registration failed. ', error.message);
    Alert.alert('Registration failed. ', error.message);
})
}

const addNewUser = async(username, email) => {
    try {
        const docRef = await addDoc(collection(db, USERS_REF), {
          name: username, 
          email: email
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (error) {
        console.log('Login failed. ', error.message);
        Alert.alert('Login failed. ', error.message);
    }
}

export const logOut = async () => {
    try {
        await signOut(auth);
    }
    catch (error) {
        console.log('Logout failed. ', error.message);
        Alert.alert('Logout failed. ', error.message);
    }
}