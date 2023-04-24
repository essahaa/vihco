import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, Button, TextInput } from 'react-native';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import { collection, onSnapshot, orderBy, query, addDoc, where, getDocs, data, getDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import styles from '../styles/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header';
import { getAuth } from 'firebase/auth'
import { Alert } from 'react-native';

export default function Groups({ navigation }) {
  const [groupname, setGroupname] = useState('')
  const [groupId, setGroupId] = useState('')
  const [groups, setGroups] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('')
  const [addingGroup, setAddingGroup] = useState(false)
  const [sharedGroups, setSharedGroups] = useState([])
  const [sharedGroupNames, setSharedGroupNames] = useState([])

  const auth = getAuth()

  useEffect(() => {
    setCurrentUserId(auth.currentUser.uid)
  }, [])

  useEffect(() => {
    console.log("id: " + currentUserId);
    if (currentUserId !== "") {
      getData()
      getSharedGroups()
    }
  }, [currentUserId]);

  useEffect(() => {
    if (sharedGroups.length === sharedGroupNames.length) {
      console.log("shared group names already set")
      console.log("sharedgroupnames: " + sharedGroupNames);
    } else {
      const temp = []
      sharedGroups.map((group) => {
        console.log(group.id);
        const groupData = {
          name: group.groupName,
          groupId: group.groupId,
          creatorId: group.creatorId
        }
        temp.push(groupData);
      })
      setSharedGroupNames(temp)
    }
  }, [sharedGroups])


  const getData = async () => {
    const q = query(collection(db, USERS_REF + "/" + currentUserId + "/groups"))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No groups found!")
    }
    else {
      onSnapshot(q, (querySnapshot) => {
        setGroups(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      })
    }
  }

  const getSharedGroups = async () => {
    const q = query(collection(db, USERS_REF + "/" + currentUserId + "/sharedGroups"))
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No shared groups found!")
    }
    else {
      onSnapshot(q, (querySnapshot) => {
        setSharedGroups(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      })
    }
  }

  const addNewGroup = async () => {
    setAddingGroup(false)
    try {
      if (groupname !== "") {
        const groupAdded = await addDoc(collection(db, USERS_REF + "/" + currentUserId + "/groups"), {
          name: groupname,
          admins: [currentUserId],
          players: [currentUserId]
        });
        console.log("group added with id: " + groupAdded.id);
        setGroupId(groupAdded.id);
        getData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
 

const deleteGroup = async (groupId) => {
  const groupRef = doc(db, USERS_REF + "/" + currentUserId + "/groups/" + groupId);

  try {
    const group = await getDoc(groupRef);

    if (group.exists()) {
      const groupData = group.data();

      if (groupData.admins.includes(currentUserId)) {
        Alert.alert(
          "Delete Group",
          "Are you sure you want to delete this group?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Delete",
              onPress: async () => {
                await deleteDoc(groupRef);
                setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
                console.log("Group deleted successfully!");
              },
              style: "destructive"
            }
          ]
        );
      } else {
        console.log("You are not authorized to delete this group!");
      }
    } else {
      console.log("The group you are trying to delete does not exist!");
    }
  } catch (error) {
    console.log(error.message);
  }
};




  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollview} style={{ marginBottom: 20 }}>
        <Text style={[styles.title, { marginBottom: 10 }]}>CREATED GROUPS</Text>
        {groups.map((group, i) => (
          <View key={i} style={styles.groupContainer}>
            <Pressable
              style={[styles.gameButton, { justifyContent: 'center', paddingTop: -10 }]}
              onPress={() => navigation.navigate('Group', { group: group.name, id: group.id })}
            >
              <View
                style={{ flexDirection: 'row' }}>
                <Text style={styles.gameText}>
                  {group.name}                </Text>
                {group.admins.includes(currentUserId) && (
                  <Pressable style={styles.flexRight} onPress={() => deleteGroup(group.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
                  </Pressable>
                )}



              </View>


            </Pressable>

          </View>
        ))}
        {!addingGroup ? (
          <Pressable style={styles.addGameButton} onPress={() => setAddingGroup(true)}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.addGameText}>Add new group</Text>
              <View style={styles.flexRight}>
                <MaterialCommunityIcons name="plus-thick" size={32} color="#4E9BB0" />
              </View>
            </View>
          </Pressable>
        ) : (
          <Pressable style={styles.addGameButton}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={styles.addGameInput}
                placeholder="Enter group name"
                onChangeText={(name) => setGroupname(name)}
                placeholderTextColor="white"
                color="white"
                cursorColor="white"
                autoFocus={true}
                onSubmitEditing={addNewGroup}
              />
              <View style={styles.flexRight}>
                <Pressable style={{ flex: 1, justifyContent: 'center' }} onPress={addNewGroup}>
                  <MaterialCommunityIcons name="plus-thick" size={32} color="#F9BB00" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
        <Text style={[styles.title, { marginVertical: 10 }]}>SHARED GROUPS</Text>
        {sharedGroupNames.map((sharedGroup, i) => (
          <Pressable
            key={i}
            style={styles.gameButton}
            onPress={() =>
              navigation.navigate('GroupShared', {
                group: sharedGroup.name,
                id: sharedGroup.groupId,
                creatorId: sharedGroup.creatorId,
              })
            }
          >
            <Text style={styles.gameText}>{sharedGroup.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

}