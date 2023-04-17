import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc, where, getDocs, data, getDoc, doc, setDoc } from 'firebase/firestore';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import styles from '../styles/style';

export default Group = ({route}) => {
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('')
    const [playerEmail, setPlayerEmail] = useState('');
    const [playerId, setPlayerId] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        if( groupName === '' && route.params?.group ) {
            setGroupName(route.params.group);
        }

        if( route.params?.id ) {
            setGroupId(route.params.id);
        }
    }, []);
    
    useEffect(() => {
        if(groupId) {
          const q = query(collection(db, GROUPS_REF + "/" + groupId + "/users"), orderBy("name"))
          onSnapshot(q, (querySnapshot) => {
              setPlayers(querySnapshot.docs.map(doc => ({
                  id: doc.id,
                ...doc.data()
              })));
          });
        }
        console.log(players)
      }, [groupId, playerName]);

      const addPlayer = async () => {
        //hakee syötettyä sähköpostiosoitetta vastaavan dokumentin
        const q = query(collection(db, USERS_REF), where("email", "==", playerEmail));
        const querySnapshot = await getDocs(q);
  
        if(querySnapshot.empty) {
          console.log("No such user found!")
        }
        else {
          querySnapshot.forEach((doc) => {
            const data = doc.data()
            setPlayerId(doc.id)
            setPlayerName(data.name)
            console.log("Username data: " + data.name + " => " + doc.id)
          });
          console.log(playerId)
          await setDoc((doc(db, GROUPS_REF + "/" + groupId + "/users/" + playerId)), {
            name: playerName,
            admin: false
          })
        }
      }

    
    
    return (
        <View style={styles.container}>
            <Header />
            <View>
            <Text style={styles.text}>Add new player to the group</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Player email'
                value={playerEmail}
                onChangeText={(playerEmail) => setPlayerEmail(playerEmail.trim())}
                autoCapitalize="none"
                keyboardType='email-address'
                placeholderTextColor='#4E9BB0'
            />
            <Pressable
                onPress={addPlayer}
                style={styles.buttonPrimary}
                >
                <Text style={[styles.buttonText, {fontSize: 20}]}>ADD</Text>
            </Pressable>
        </View>
        <View >
        <Text style={styles.title}>PLAYERS</Text>
          {players.map((key,i) => (
            <View key={i} style={[styles.gameButton, {height: 120}]}>
              <Text style={styles.gameText} >{players[i].name}</Text>
            </View>      
          ))}
      </View>
            
           
        </View>
    );
  }