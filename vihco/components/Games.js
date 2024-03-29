import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Header from './Header';
import styles from '../styles/style';
import GroupPicker from './GroupPicker';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SharedGames from './sharedGames';

export default Games = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false);
  const [newGameName, setNewGameName] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [myGroups, setMyGroups] = useState([])
  const [sharedGroups, setSharedGroups] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [groupIsShared, setGroupIsShared] = useState();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setGroups([]);
      setGames([]);
      setMyGroups([]);
      setSharedGroups([]);
      setCurrentGroupId('');
      if(user) {
        setCurrentUserId(auth.currentUser.uid)
      }else {
        setCurrentUserId('');
      }
    });
  }, []);

  useEffect(() => {
    if(currentUserId !== "") {
      getData();
    }
  }, [currentUserId])

  useEffect(() => {
    if(currentGroupId !== "") {
      checkIsGroupShared();
      getGames();
    }
  }, [currentGroupId, groups])

  useEffect(() => {
    if(groups.length !== 0 && currentGroupId === '') {
      setCurrentGroupId(groups[0].value)
    }
  }, [groups])
  

  const checkIsGroupShared = () => {
    let ids = [];
    sharedGroups.map((group) => {
      ids.push(group.value);
    })
    if(ids.includes(currentGroupId)) {
      setGroupIsShared(true);
    }else {
      setGroupIsShared(false);
    }
  };
  
  const getData = async () => {
    const q1 = query(collection(db, USERS_REF + "/" + currentUserId + "/groups"))
    onSnapshot(q1, (querySnapshot) => {
      setMyGroups(querySnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      })));
    });

    const q2 = query(collection(db, USERS_REF + "/" + currentUserId + "/sharedGroups"));
    onSnapshot(q2, (querySnapshot) => {
      setSharedGroups(querySnapshot.docs.map(doc => ({
        label: doc.data().groupName,
        value: doc.id
      })));
    });
      if (sharedGroups.length == 0) {
        setGroups(myGroups)
      }else {
        setGroups(myGroups.concat(sharedGroups))
      }

      if(currentGroupId !== "") {
        getGames()
      }
  }

  const getGames = () => {
    const q = query(collection(db, USERS_REF + "/" + currentUserId + "/groups/" + currentGroupId + "/games" ), orderBy("orderId")) 
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  const getPlayers = async (newGameId) => {
    const docRef = doc(db, USERS_REF + "/" + currentUserId + "/groups", currentGroupId); 
    const docSnap = await getDoc(docRef);

    let playerIds = [];
    if (docSnap.exists()) {
        const data = docSnap.data().players
        playerIds = data;
    } else {
        console.log("Player ids not found!");
    }
    playerIds.map((id) => {
      getPlayer(id, newGameId);
    })
  }

  const getPlayer = async (id, gameId) => {
    const docRef = doc(db, USERS_REF, id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const gamesRef = USERS_REF + "/" + currentUserId + "/groups/" + currentGroupId + "/games"
      addDoc(collection(db, gamesRef + "/" + gameId + "/users"), {
        name: docSnap.data().name,
        loss: 0,
        win: 0,
        userId: id
      })
    } else {
        console.log("Player ids not found!");
    }
  }

  const addGame = async () => {
    const gamesRef = USERS_REF + "/" + currentUserId + "/groups/" + currentGroupId + "/games"
    setAddingGame(false);
    try {
      if(newGameName.trim() !== "") {
        const docRef = await addDoc(collection(db, gamesRef), {
          orderId: games.length,
          name: newGameName
        })
        
        const gameId = docRef.id;
        getPlayers(gameId)
      }
      getGames();
    }catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
        <View style={[styles.dropdown, {width:'60%', flexDirection: 'row', justifyContent: 'center',marginBottom:20, marginTop: 15}]}>
          <View>
          <Pressable onPress={() => getData()}>
            <GroupPicker groups={groups} onSelect={selectedValue => setCurrentGroupId(selectedValue)} />
          </Pressable>
          </View>
        </View>
      {groupIsShared ?
        <SharedGames groupId={currentGroupId} userId={currentUserId}/>
      :
      <ScrollView 
        contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}
      >
        {games.map((key, i) => (
          <Pressable
            key={i}
            style={[styles.gameButton, {flex: 1}]}
            onPress={() => navigation.navigate('Game', {game: games[i].name, id: games[i].id, groupId: currentGroupId, userId: currentUserId})}
          >
              <Text style={[styles.gameText, {marginRight: 10}]}>{games[i].name}<Text>  </Text> 
              <MaterialIcons style={[styles.flexRight]} name="arrow-forward-ios" size={18} color="white" />
              </Text> 
          </Pressable>
        ))
        }
        {currentGroupId &&
        <>
        { !addingGame ?
          <Pressable
            style={styles.addGameButton}
            onPress={() => setAddingGame(true)}
          >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.addGameText}>Add new game</Text>
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
                  placeholder='Enter game name'
                  onChangeText={(name) => setNewGameName(name)}
                  placeholderTextColor='white'
                  color="white"
                  cursorColor="white"
                  autoFocus={true}
                  onSubmitEditing={addGame}
              />
              <View style={styles.flexRight}>
                <Pressable
                  style={{flex: 1, justifyContent: 'center'}}
                  onPress={addGame}
                >
                  <MaterialCommunityIcons name="plus-thick" size={32} color="#F9BB00" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        }
        </>
      }
      </ScrollView>
    }
    </View>
  );
}