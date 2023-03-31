import { Text, View } from 'react-native';
import styles from '../styles/style';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db, USERS_REF } from '../firebase/Config';

export default function Home({navigation, route}) {

  const [username, setUsername] = useState('')
  const [userUid, setUserUid] = useState('')

  useEffect(() => {
    setUserUid(route.params.userUid)
    getUserData()
  }, [])

  const getUserData = async () => {
    const docRef = doc(db, USERS_REF, userUid);
    const docSnap = await getDoc(docRef);

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