import { Alert } from 'react-native';
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, USERS_REF } from '../firebase/Config';

const auth = getAuth();

export const signUp = async (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            if(userCredential.user.uid !== "") {
                try {
                    // const usersCollection = collection(db, USERS_REF);
                    // const usersDocumentData =  {
                    //   name: username, 
                    //   email: userCredential.user.email
                    // };
                    // const usersDocRef = doc(usersCollection, userCredential.user.uid);
                    // setDoc(usersDocRef, usersDocumentData);
                    // console.log("Document written with ID: ", userCredential.user.uid);
                    const usersDocRef = doc(db, USERS_REF, userCredential.user.uid)
                    const usersDocumentData = {
                        name: username,
                        email: userCredential.user.email
                    }
                    setDoc(usersDocRef, usersDocumentData);
                    console.log("Document written with ID: ", userCredential.user.uid);
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                }
                else {
                    console.log("empty id")
                }
        })
        .catch ((error) => {
        console.log('Registration failed. ', error.message);
        Alert.alert('Registration failed. ', error.message);
    })
}

export const signIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        console.log('Login failed. ', error.message);
        Alert.alert('Login failed. ', error.message);
    });
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