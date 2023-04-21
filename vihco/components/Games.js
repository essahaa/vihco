import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header';
import styles from '../styles/style';
import GroupPicker from './GroupPicker';
import { getAuth } from 'firebase/auth';

export default Games = ({navigation}) => {
  const [groups, setGroups] = useState([]);
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false); //flag
  const [newGameName, setNewGameName] = useState('');
  const [newGamePlayers, setNewGamePlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [myGroups, setMyGroups] = useState([])
  const [sharedGroups, setSharedGroups] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [groupIsShared, setGroupIsShared] = useState();

  const auth = getAuth();

  useEffect(() => {
    setCurrentUserId(auth.currentUser.uid)
  }, []);

  useEffect(() => {
    if(currentUserId !== "") {
      getData();
      console.log("getting data: " + currentUserId)
      console.log("mjhbjgku")
    }
  }, [currentUserId])

  useEffect(() => {
    if(currentGroupId !== "") {
      //checkIsGroupShared();
      getGames();
    }
    console.log("juu")
  }, [currentGroupId])

  /* useEffect(() => {
    if(groupIsShared !== null) {
      getGames();
    }
  }, [groupIsShared]) */
  
  
  const checkIsGroupShared = () => {
    if(sharedGroups.includes(currentGroupId)) {
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
    //if (sharedGroups.length == 0) {
      setGroups(myGroups)
      if(currentGroupId === '') {
        setCurrentGroupId(myGroups[0].value)
      }
    //}// else {
    //setGroups(myGroups.concat(sharedGroups))
    //}     console.log('groups:', groups);

  }

  const getGames = () => {
    const q = query(collection(db, USERS_REF + "/" + currentUserId + "/groups/" + currentGroupId + "/games" ), orderBy("orderId")) //current group id tänne
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  const getPlayers = async (newGameId) => {
  //if(currentGroupId) {
    const docRef = doc(db, USERS_REF + "/" + currentUserId + "/groups", currentGroupId); 
    const docSnap = await getDoc(docRef);

    let playerIds = [];
    if (docSnap.exists()) {
        const data = docSnap.data().players
        playerIds = data;
        console.log("playerids: " + playerIds)
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
      console.log(JSON.stringify(docSnap.data()))
      /* let temp = [...newGamePlayers];
      const data = docSnap.data()
      temp.push(data);
      setNewGamePlayers(temp);
      console.log("newplayers: " + JSON.stringify(newGamePlayers)) */
    } else {
        console.log("Player ids not found!");
    }
  }

  const addGame = async () => {
    const gamesRef = USERS_REF + "/" + currentUserId + "/groups/" + currentGroupId + "/games"
    setAddingGame(false);
    console.log("groupid: " + currentGroupId)
    try {
      if(newGameName.trim() !== "") {
        await addDoc(collection(db, gamesRef), {
          orderId: games.length,
          name: newGameName
        }).then(function(docRef) {
          const gameId = docRef.id;
          getPlayers(gameId)
          /* newGamePlayers.map(player => (
            addDoc(collection(db, gamesRef + "/" + gameId + "/users"), {
              name: player.name,
              loss: 0,
              win: 0
            })
          )) */
        });
      }
      getGames();
    }catch (error) {
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.listTop}>
        <Text style={styles.title}>GAMES</Text>
        <View style={styles.dropdown}>
          {groups.length !== 0 ?
            <GroupPicker groups={groups} onSelect={selectedValue => setCurrentGroupId(selectedValue.value)} />
          :
            <Text style={styles.text}>Getting groups...</Text>
          }
        </View>
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}
      >
        {games.map((key, i) => (
          <Pressable
            key={i}
            style={styles.gameButton}
            onPress={() => navigation.navigate('Game', {game: games[i].name, id: games[i].id, groupId: currentGroupId})}
          >
              <Text style={styles.gameText}>{games[i].name}</Text>
          </Pressable>
        ))
        }
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
      </ScrollView>
    </View>
  );
}