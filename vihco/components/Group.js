import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { collection, onSnapshot, orderBy, query, addDoc, where, getDocs, data, getDoc, doc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import styles from '../styles/style';
import { getAuth } from 'firebase/auth'

export default Group = ({route}) => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('')
  const [playerEmail, setPlayerEmail] = useState('');
  const [playerId, setPlayerId] = useState('')
  const [players, setPlayers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [playerIds, setPlayerIds] = useState([]);
  const [tempPlayer, setTempPlayer] = useState();
  const [playerName, setPlayerName] = useState('');

  const auth = getAuth();
  
  useEffect(() => {
    setCurrentUserId(auth.currentUser.uid)

    if( groupName === '' && route.params?.group ) {
      setGroupName(route.params.group);
    }

    if( route.params?.id ) {
        setGroupId(route.params.id);
    }
    
  }, []);
  
  useEffect(() => {
    if(groupId) {
      getPlayerIds();
    }
    }, [groupId]);

    useEffect(() => {
      if(playerIds && playerIds.length !== 0) {
        const temp = [];
        playerIds.map((id) => {
          getPlayer(id); //tempPlayer ei refressaa nimeä
          console.log("player in map" + tempPlayer);
        })
        //temp.push(docSnap.data())
        //getPlayers()
      }
    }, [playerIds])
  useEffect(() => {
    if(playerIds.length !== 0) {
      const temp = [];
      playerIds.map((id) => {
        getPlayer(id); 
        console.log("player in map" + tempPlayer);
      })
    }
  }, [playerIds])

  useEffect(() => {
    if (playerId && currentUserId) {
      addDoc(collection(db, USERS_REF + "/" + playerId + "/sharedGroups"), {
        creatorId: currentUserId,
        groupId: groupId, 
        groupName: groupName
      })
      updateDoc(doc(db, USERS_REF + "/" + currentUserId + "/groups", groupId), {
        players: arrayUnion(playerId)
      })
    }
    console.log("groupid: " + groupId)
  }, [playerId])

  useEffect(() => {
    if (playerId && currentUserId) {
      addDoc(collection(db, USERS_REF + "/" + playerId + "/sharedGroups"), {
        creatorId: currentUserId,
        groupId: groupId, 
        groupName: groupName
      })
      updateDoc(doc(db, USERS_REF + "/" + currentUserId + "/groups", groupId), {
        players: arrayUnion(playerId)
      })
    }
    console.log("groupid: " + groupId)
  }, [playerId])

  useEffect(() => {
    console.log("players in player effect: " + JSON.stringify(players))
  }, [players])
  
  useEffect(() => {
    if(tempPlayer) {
      let ids = []
      players.map((player) => {
        ids.push(player.id)
      })
      if(ids.includes(tempPlayer.id)) {
        console.log("player already in players")
      }else {
        const temp = [...players];
        temp.push(tempPlayer);
        console.log("tempplayereffect: " + tempPlayer)
        setPlayers(temp);
      }
    }
  }, [tempPlayer])
    

  const getPlayerIds = async () => {
    if(groupId) {
      const docRef = doc(db, USERS_REF + "/" + currentUserId + "/groups", groupId); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          console.log("playerdata:", docSnap.data().players);
          const data = docSnap.data().players
          setPlayerIds(data);
      } else {
          console.log("Player ids not found!");
      }
    }
  }

  const getPlayer = async (playerId) => { 
    const docRef = doc(db, USERS_REF, playerId); 
    await getDoc(docRef).then((data) => {
      if (data.exists()) {
        console.log("player in getplayers:", data.data().name);
        const player = {
          name: data.data().name,
          id: playerId
        }
        setTempPlayer(player);
      }else {
          console.log("Cant find player in getplayer!");
      }
    });
  }

  const addPlayer = async () => {
    const q = query(collection(db, USERS_REF), where("email", "==", playerEmail));
    const querySnapshot = await getDocs(q);
  
    if(querySnapshot.empty) {
      console.log("No such user found!")
    }
    else {
        /* const data = querySnapshot.data()
        setPlayerId(data.id)
        console.log("Username data: " + data.name + " => " + data.id) */
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setPlayerId(doc.id);
        setPlayerName(data.name);
        console.log("Username data: " + data.name + " => " + doc.id);
        //setPlayers(prevPlayers => [...prevPlayers, { id: doc.id, name: data.name }]);
      });
      getPlayerIds()
    }
  }  
    
  return (
      <View style={styles.container}>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
          <Text style={[styles.title, {marginBottom: 25}]}>GROUP NAME: {groupName}</Text>
          <Text style={[styles.text, {marginBottom: 5}]}>Add new player to {groupName}</Text>     
          <TextInput 
              style={[styles.textInput, {marginBottom: 10}]}
              placeholder='Player email'
              value={playerEmail}
              onChangeText={(playerEmail) => setPlayerEmail(playerEmail.trim())}
              autoCapitalize="none"
              keyboardType='email-address'
              placeholderTextColor='#4E9BB0'
          />
          <Pressable
              onPress={addPlayer}
              style={styles.buttonSettings}
              >
              <Text style={[styles.buttonTextSettings, {fontSize: 20}]}>ADD</Text>
          </Pressable>
      <Text style={[styles.title, {marginTop: 30}]}>PLAYERS</Text>   
        {players.map((key,i) => (
          <View key={i} style={[styles.gameButton]}>
            <Text style={styles.gameText} >{players[i].name}</Text>
          </View>      
        ))}    
      </ScrollView>        
    </View>
  );
}