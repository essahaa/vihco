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
    const [groups, setGroups] = useState([]);
    const [currentUserId, setCurrentUserId] = useState('')
    const [addingGroup, setAddingGroup] = useState(false)

    const auth = getAuth()

    useEffect(() => {
      setCurrentUserId(auth.currentUser.uid)
    }, [])
    
    useEffect(() => {
      const q = query(collection(db, GROUPS_REF), orderBy("name"))
      onSnapshot(q, (querySnapshot) => {
        setGroups(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });
      console.log(groups)
    }, []);

    const addNewGroup = async () => {
      try {
          if(groupname !== "") {
            const groupAdded = await addDoc(collection(db, GROUPS_REF), {
              name: groupname
            });
            console.log("group added with id: " + groupAdded.id);
            setGroupId(groupAdded.id);

            //lisää ryhmän luoneen käyttäjän ryhmään ja ryhmän adminiksi
            const docRef = doc(db, USERS_REF, currentUserId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data()
              const usersDocRef = doc(db, GROUPS_REF + "/" + groupAdded.id + "/users", currentUserId);
              await setDoc((usersDocRef), {
                name: data.name,
                admin: true
              })
            }
          }
          setAddingGroup(false)
        }catch (error) {
          console.log(error.message);
        }
    }

  return (
    <View style={styles.container}>
        <Header2 />
        <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
        
        
        
      <Text style={styles.title}>GROUPS</Text>
      {groups.map((key, i) => (
          <Pressable
            key={i}
            style={styles.gameButton}
            onPress={() => navigation.navigate('Group', {group: groups[i].name, id: groups[i].id})}
          >
              <Text style={styles.gameText}>{groups[i].name}</Text>
          </Pressable>
        ))
        }
        { !addingGroup ?
          <Pressable
            style={styles.addGameButton}
            onPress={() => setAddingGroup(true)}
          >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.addGameText}>Add new group</Text>
              <View style={styles.flexRight}>
                <MaterialCommunityIcons name="plus-thick" size={32} color="#4E9BB0" />
              </View>
            </View>
          </Pressable>
        :
          <Pressable
            style={styles.addGameButton}
          >
            <View style={{flexDirection: 'row'}}>
              <TextInput 
                  style={styles.addGameInput}
                  placeholder='Enter group name'
                  onChangeText={(name) => setGroupname(name)}
                  placeholderTextColor='white'
                  color="white"
                  cursorColor="white"
                  autoFocus={true}
                  onSubmitEditing={addNewGroup}
              />
              <View style={styles.flexRight}>
                <Pressable
                  style={{flex: 1, justifyContent: 'center'}}
                  onPress={addNewGroup}
                >
                  <MaterialCommunityIcons name="plus-thick" size={32} color="#F9BB00" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        }
      </ScrollView>
    </View>
  );
}