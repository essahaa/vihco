import { Alert } from 'react-native';
import { ref, set } from 'firebase/database';
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db, USERS_REF } from '../firebase/Config';

export const signUp = async (username, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            set(ref(db, USERS_REF + userCredential.user.uid), {
                name: username, 
                email: userCredential.user.email
            });
        })    
    }
    catch (error) {
        console.log('Registration failed. ', error.message);
        Alert.alert('Registration completed!');
    }
    await addNewDoc(username, email)
}



const addNewDoc = async(username, email) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
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