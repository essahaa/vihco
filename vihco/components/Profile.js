import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, GAMES_REF, USERS_REF, auth } from '../firebase/Config';
import { LinearGradient } from 'expo-linear-gradient';


export default function Profile({navigation}) {

  const [games, setGames] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const q = query(collection(db, GAMES_REF), orderBy("id"))
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    console.log(games);
    setUserId(auth.currentUser.uid)
  }, []);

  useEffect(() => {
    getUsername()
  }, [userId])

  const getUsername = async () => {
    const docRef = doc(db, USERS_REF, userId); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Username data:", docSnap.data());
        const data = docSnap.data()
        setUsername(data.name)
        
    } else {
        console.log("No such user found!");
    }
}

  return (
    <View style={[styles.container, {paddingTop:-20}]}>
      <Header />
      <View style={{backgroundColor:'#4e9bb0', width:'100%', marginTop:-30}}>
        <Text style={[styles.gameHeader, {textAlign: 'center'}]}>My profile</Text>
        
        <View>
  <LinearGradient  colors={['#4e9bb0' , 'black']} locations={[0.6,0.4]} start={[0, 0]} end={[0, 1]} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 15 }}>
    <View style={{ flexDirection:'row', alignItems:'center' }}>
      <MaterialCommunityIcons name="circle" size={150} color="white" />
      <Text style={[styles.usernameText, {textAlign: 'center', paddingLeft: 10,paddingBottom: 20}]}>{username}</Text>
    </View>
  </LinearGradient>
</View>
      </View>

      <View style={{backgroundColor:'red',width:'100%'}}>
  <Text style={[styles.title,{textAlign:'left', paddingLeft:200}]}>Select group</Text>
  <Text style={[styles.title,{textAlign:'left', paddingLeft:200}]}>dropS</Text>
</View>

      <View >
      <Text style={[styles.title, {textAlign: "center",marginTop:30}]}>My game statistics</Text>
        <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
          {games.map((key,i) => (
            <View style={[styles.gameButton, {height: 120}]}>
              <Text style={styles.gameText} key={i}>{games[i].name}</Text>
              <View style={styles.flexRight}>
                <Text>wins</Text>
                <Text>losses</Text>
                <Text>win/loss ratio</Text>
              </View>
              
            </View>
                
          ))
          }
        </ScrollView>
      </View>
    </View>
  );
}