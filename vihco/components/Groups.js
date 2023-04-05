import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, Button, TextInput } from 'react-native';
import { db, GROUPS_REF } from '../firebase/Config';
import { collection, onSnapshot, orderBy, query, addDoc } from 'firebase/firestore';
import styles from '../styles/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Groups({navigation}) {
    const [groupname, setGroupname] = useState('')
    const [players, setPlayers] = useState([])
    const [groups, setGroups] = useState([])
    const [playerEmail, setPlayerEmail] = useState('')

    useEffect(() => {
        const q = query(collection(db, GROUPS_REF))
        onSnapshot(q, (querySnapshot) => {
          setGroups(querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })));
        });
        console.log(groups);
      }, []);

    const addPlayer = () => {

    }



  return (
    <View style={styles.container}>
        <Text style={styles.text}>Add new group</Text>
        <TextInput 
            style={styles.textInput}
            placeholder='Groupname'
            value={groupname}
            onChangeText={(groupname) => setGroupname(groupname.trim())}
            autoCapitalize="none"
            placeholderTextColor='#4E9BB0'
        />
        <Text style={styles.text}>Add new player to the group</Text>
        <TextInput 
            style={styles.textInput}
            placeholder='Player email'
            value={playerEmail}
            onChangeText={(playerEmail) => setPlayerEmail(playerEmail.trim())}
            autoCapitalize="none"
            placeholderTextColor='#4E9BB0'
        />
        
        <Text style={styles.text}>PLAYERS</Text>
        <View >
        <Text style={styles.title}>Groups</Text>
        <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
          {groups.map((key,i) => (
            <View style={[styles.gameButton, {height: 120}]}>
              <Text style={styles.gameText} key={i}>{groups[i].groupname}</Text>
              
              
            </View>
                
          ))
          }
        </ScrollView>
      </View>
    </View>
  );
}