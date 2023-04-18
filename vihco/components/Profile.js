import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, GAMES_REF, USERS_REF, auth } from '../firebase/Config';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Profile({navigation}) {

  const [games, setGames] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);

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
    <View style={styles.container}>
      <Header />
      <View >
        <Text style={styles.gameHeader}>My profile</Text>
        <Text style={styles.text}>username: {username}</Text>
        <View style={styles.flexHeaderRigth}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <MaterialCommunityIcons style={styles.headerIcon} name="pencil-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <Text style={styles.title}>Select group</Text>
        <DropDownPicker 
        style = {[styles.dropdown]}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        multiple={true}
        textStyle={styles.buttonTextSettings}

      />
      </View>
      <View >
        <Text style={styles.title}>My game statistics</Text>
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