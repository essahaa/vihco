import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header';
import styles from '../styles/style';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAuth } from 'firebase/auth';

export default Games = ({navigation}) => {
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false); //flag
  const [newGameName, setNewGameName] = useState('');
  const [newGamePlayers, setNewGamePlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');

  const auth = getAuth();

  useEffect(() => {
    setCurrentUserId(auth.currentUser.uid)
  }, []);

  useEffect(() => {
    if(currentUserId) {
      getGames();
    }
  }, [currentUserId])
  

  const getGames = () => {
    const q = query(collection(db, USERS_REF + "/" + currentUserId + "/groups/H4Kr3DEiMmJLVhEktjWm/games" ), orderBy("orderId")) //current group id tänne
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  const getPlayers = async (newGameId) => {
  //if(currentGroupId) {
    const docRef = doc(db, USERS_REF + "/" + currentUserId + "/groups", "H4Kr3DEiMmJLVhEktjWm"); 
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
      const gamesRef = USERS_REF + "/" + currentUserId + "/groups/H4Kr3DEiMmJLVhEktjWm/games"
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
    const gamesRef = USERS_REF + "/" + currentUserId + "/groups/H4Kr3DEiMmJLVhEktjWm/games"
    setAddingGame(false);
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
        <View style={styles.flexRight}>
        <DropDownPicker 
        style = {[styles.dropdown,{width:215}]}
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
      </View>
      <ScrollView 
        contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}
      >
        {games.map((key, i) => (
          <Pressable
            key={i}
            style={styles.gameButton}
            onPress={() => navigation.navigate('Game', {game: games[i].name, id: games[i].id})}
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