import { Text, View } from 'react-native';
import styles from '../styles/style';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db, USERS_REF } from '../firebase/Config';
import { onAuthStateChanged, getAuth, getIdToken } from "firebase/auth";

export default function Home({navigation, route}) {

  const [username, setUsername] = useState('')
  const [userUid, setUserUid] = useState('')

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUid(user.uid)
      }
    });
  }, [])

  useEffect(() => {
    getUserData()
  }, [userUid])

  const getUserData = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("User is not signed in.");
      return;
    }
  
    const idToken = await currentUser.getIdToken();
  
    const docRef = doc(db, USERS_REF, userUid);
    const docSnap = await getDoc(docRef, { 'idToken': idToken });
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data()
      const username = data.name
      setUsername(username)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {username}</Text>
    </View>
  );
}