import styles from '../styles/style';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db, USERS_REF } from '../firebase/Config';
import { onAuthStateChanged, getAuth, getIdToken } from "firebase/auth";
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Header3 from './Header3';
import Logo from './Logo2';

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
    <View style={[styles.container]}>
      <Logo />
      <View style={[styles.listTop, {marginVertical: 5}]}>
      
        <Text style={[styles.title, {textAlign: 'center', flex: 1}]}>Welcome {username} !</Text>
     
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}
      >
          <Pressable
            style={[styles.gameButton, {marginVertical: 10}]}
            onPress={() => navigation.navigate('Profile')}
          >
              <Text style={[styles.gameText, {textAlign: 'center'}]}>Profile</Text>
          </Pressable>
          <Pressable
            style={[styles.gameButton, {marginVertical: 10}]} 
            onPress={() => navigation.navigate('Groups')}
          >
              <Text style={[styles.gameText, {textAlign: 'center'}]}>Groups</Text>
          </Pressable>
          <Pressable
            style={styles.gameButton}
            onPress={() => navigation.navigate('Games')}
          >
              <Text style={[styles.gameText, {textAlign: 'center'}]}>Games</Text>
          </Pressable>
        
      </ScrollView>
    </View>

  );
}