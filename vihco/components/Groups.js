import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { db, USERS_REF } from '../firebase/Config';
import { collection, onSnapshot, query, addDoc, where, getDocs, getDoc, doc, deleteDoc } from 'firebase/firestore';
import styles from '../styles/style';
import { MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import Header from './Header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Groups({ navigation }) {
  const [groupname, setGroupname] = useState('')
  const [groups, setGroups] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('')
  const [addingGroup, setAddingGroup] = useState(false)
  const [sharedGroups, setSharedGroups] = useState([])
  const [sharedGroupNames, setSharedGroupNames] = useState([])

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setGroups([]);
      setSharedGroups([]);
      setSharedGroupNames([]);
      if(user) {
        setCurrentUserId(auth.currentUser.uid)
      }else {
        setCurrentUserId('');
      }
    });
  }, [])

  useEffect(() => {
    if (currentUserId !== "") {
      getData()
    }
  }, [currentUserId]);

  useEffect(() => {
    if (sharedGroups.length === sharedGroupNames.length) {
      console.log("shared group names already set")
    } else {
      const temp = []
      sharedGroups.map((group) => {
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
    getSharedGroups()
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
        await addDoc(collection(db, USERS_REF + "/" + currentUserId + "/groups"), {
          name: groupname,
          admins: [currentUserId],
          players: [currentUserId]
        });
        getData();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteGroup = async (groupId) => {
    const groupRef = doc(db, USERS_REF + "/" + currentUserId + "/groups/", groupId);

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
                  const docRef = doc(db, USERS_REF + "/" + currentUserId + "/groups", groupId); 
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                      const data = docSnap.data().players
                      console.log("data: " + data)
                      data.map((id) => {
                        deleteSharedGroup(id, groupId);
                      })
                  } else {
                      console.log("Player ids not found!");
                  }
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

  const deleteSharedGroup = async (userId, groupId) => {
    const q = query(collection(db, USERS_REF + "/" + userId + "/sharedGroups"), where("groupId", "==", groupId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }


  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollview} style={{ marginBottom: 20 }}>
        <Text style={[styles.title, { marginBottom: 10 }]}>CREATED GROUPS</Text>
        {groups.map((group, i) => (
          <View key={i} style={styles.groupContainer}>
            <Pressable
              style={styles.gameButton}
              onPress={() => navigation.navigate('Group', { group: group.name, id: group.id, admins: group.admins })}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.gameText]}>
                  {group.name}<Text>  </Text>  
                  <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
                </Text>

                <Text
                style={[styles.flexRight, {borderRadius:10}]}>

                </Text>

                <Text
                style={[styles.flexRight, {borderRadius:10}]}>

                </Text>
                <Text
                style={[styles.flexRight, {borderRadius:100}]}>

                </Text>
                
                {group.admins.includes(currentUserId) && (
                  <Pressable
                    style={[styles.flexRight, { borderRadius: 0 }]}
                    onPress={() => deleteGroup(group.id)}
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={24}
                      color="white"
                    />
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
        <Text style={[styles.title, { marginVertical: 10 }]}>JOINED GROUPS</Text>
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
            <View style={{ flexDirection: 'row' }}>
            <Text style={styles.gameText}>{sharedGroup.name}<Text>  </Text>  
                  <MaterialIcons name="arrow-forward-ios" size={16} color="white" /></Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

}