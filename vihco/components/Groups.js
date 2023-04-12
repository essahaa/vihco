import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, Button, TextInput } from 'react-native';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import { collection, onSnapshot, orderBy, query, addDoc, where, getDocs, data, getDoc, doc, setDoc } from 'firebase/firestore';
import styles from '../styles/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header2 from './Header2';
import { getAuth } from 'firebase/auth';

export default function Groups({navigation}) {
    const [groupname, setGroupname] = useState('')
    const [groupId, setGroupId] = useState('')
    const [groups, setGroups] = useState([])
    const [playerEmail, setPlayerEmail] = useState('');
    const [playerId, setPlayerId] = useState('')
    const [playerName, setPlayerName] = useState('')
    const [players, setPlayers] = useState([]);
    const [group, setGroup] = useState([])

    const auth = getAuth()
    
    const addPlayer = async () => {
      //hakee syötettyä sähköpostiosoitetta vastaavan dokumentin
      const q = query(collection(db, USERS_REF), where("email", "==", playerEmail));
      const querySnapshot = await getDocs(q);

      const groupQ = query(collection(db, GROUPS_REF), where("name", "==", groupname));
      const groupQuerySnapShot = await getDocs(groupQ);

      groupQuerySnapShot.forEach((doc) => {
        const data2 = doc.data()
        setGroup(groupQuerySnapShot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
        console.log("Group data: " + data2.name + " => " + doc.id)
      });
      console.log("group id: " + groupId)

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

        const usersDocRef = doc(db, GROUPS_REF + "/" + groupId + "/users", playerId)
    
        await setDoc((usersDocRef), {
          name: playerName,
          admin: false
        })
      }
    }

    const addNewGroup = async () => {
      try {
          if(groupname.trim() !== "") {
            const groupAdded = await addDoc(collection(db, GROUPS_REF), {
              name: groupname
            });
            console.log("group added with id: " + groupAdded.id);
            setGroupId(groupAdded.id);

            //lisää ryhmän luoneen käyttäjän ryhmään ja ryhmän adminiksi
            const currentUserId = auth.currentUser.uid;
            const docRef = doc(db, USERS_REF, currentUserId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              //console.log("Document data:", docSnap.data());
              const data = docSnap.data()
              const usersDocRef = doc(db, GROUPS_REF + "/" + groupAdded.id + "/users", currentUserId);
              await setDoc((usersDocRef), {
                name: data.name,
                admin: true
              })
            }
          }
        }catch (error) {
          console.log(error.message);
        }
    }

  return (
    <View style={styles.container}>
        <Header2 />
        <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
        <View>
            <Text style={styles.text}>Add new group</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Groupname'
                value={groupname}
                onChangeText={(groupname) => setGroupname(groupname.trim())}
                autoCapitalize="none"
                placeholderTextColor='#4E9BB0'
            />
            <Pressable
                onPress={() => addNewGroup()}
                style={styles.buttonPrimary}
                >
                <Text style={[styles.buttonText, {fontSize: 20}]}>ADD</Text>
            </Pressable>
        </View>
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
                onPress={() => addPlayer()}
                style={styles.buttonPrimary}
                >
                <Text style={[styles.buttonText, {fontSize: 20}]}>ADD</Text>
            </Pressable>
        </View>
        
        <View >
        <Text style={styles.title}>PLAYERS</Text>
        
          {groups.map((key,i) => (
            <View key={i} style={[styles.gameButton, {height: 120}]}>
              <Text style={styles.gameText} >{groups[i].name} + {groups[i].id}</Text>
              
              
            </View>
                
          ))
          }
      </View>
      </ScrollView>
    </View>
  );
}