import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc } from 'firebase/firestore';
import { db, GAMES_REF, GROUPS_REF } from '../firebase/Config';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header';
import styles from '../styles/style';
import DropDownPicker from 'react-native-dropdown-picker';

export default Games = ({navigation}) => {
  const [games, setGames] = useState([]);
  const [addingGame, setAddingGame] = useState(false); //flag
  const [newGameName, setNewGameName] = useState('');
  const [newGamePlayers, setNewGamePlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    const q = query(collection(db, GAMES_REF), orderBy("orderId"))
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }

  const getPlayers = () => {
    const q = query(collection(db, GROUPS_REF + "/" + "XRkR2RgiUnCQ2PBRQFbQ" + "/users"))
    onSnapshot(q, (querySnapshot) => {
        setNewGamePlayers(querySnapshot.docs.map(doc => ({
            id: doc.id,
        ...doc.data()
        })));
    });
  }

  const addGame = async () => {
    setAddingGame(false);
    try {
      if(newGameName.trim() !== "") {
        await addDoc(collection(db, GAMES_REF), {
          orderId: games.length,
          name: newGameName
        }).then(function(docRef) {
          const gameId = docRef.id;
          getPlayers();
          console.log(newGamePlayers);
          newGamePlayers.map(player => (
            addDoc(collection(db, "/games/" + gameId + "/users"), {
              name: player.name,
              loss: 0,
              win: 0
            })
          ));
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