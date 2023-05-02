import styles from '../styles/style';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db, USERS_REF } from '../firebase/Config';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Text, View, ScrollView, Pressable } from 'react-native';
import Logo from './Logo3';
import Header3 from './Header3';
import LoadingScreen from './LoadingScreen';

export default function Home({navigation}) {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  const [username, setUsername] = useState('')
  const [userUid, setUserUid] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUid(user.uid)
      }else {
        console.log("User is not signed in.");
        navigation.navigate("Login");
      }
    });
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2500);
  
    return () => clearTimeout(timeout);
  }, []);

  fetchData = async () => {
    const querySnapshot = await db.collection('USERS_REF').get();
    const data = querySnapshot.docs.map((doc) => doc.data());
    setData(data);
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);



  useEffect(() => {
    if(userUid !== '') {
      getUserData()
    }
  }, [userUid])
  

  const getUserData = async () => {
    const currentUser = auth.currentUser;
  
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
      <Header3/>
      <Logo />
      {showLoadingScreen ? ( 
      <LoadingScreen />
    ) : (
      <ScrollView 
        contentContainerStyle={styles.scrollview}
        style={{marginBottom: 5}}
      >
         <Text style={[styles.title, {fontSize: 24}, {textAlign: 'center', flex: 1, marginBottom: 20}]}>Welcome, <Text style={[{ color: '#F9BB00' }, {fontSize: 24}]}>{username} <Text style={[{ color: '#Ffffff' }, {fontSize: 26}, {fontFamily: ''}]}>!</Text></Text></Text>
          <Pressable
            style={[styles.gameButton, {marginVertical: 10}, {justifyContent: 'center'}]}
            onPress={() => navigation.navigate('Profile')}
          >
              <Text style={[styles.gameText , {textAlign: 'center'}, {marginBottom: 10}, {fontSize: 21}]}>Profile</Text>
          </Pressable>
          <Pressable
            style={[styles.gameButton, {marginVertical: 10}, {justifyContent: 'center'}]} 
            onPress={() => navigation.navigate('Groups')}
          >
              <Text style={[styles.gameText, {textAlign: 'center'}, {marginBottom: 10}, {fontSize: 21}]}>Groups</Text>
          </Pressable>
          <Pressable
            style={[styles.gameButton, {marginVertical: 10}, {justifyContent: 'center'}]} 
            onPress={() => navigation.navigate('Games')}
          >
              <Text style={[styles.gameText, {textAlign: 'center'}, {marginBottom: 10}, {fontSize: 21}]}>Games</Text>
          </Pressable> 
      </ScrollView>
    )}
    </View>
  );
}