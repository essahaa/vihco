import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import styles from '../styles/style';

export default Group = ({route}) => {
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('')
  const [groupCreator, setGroupCreator] = useState('')
  const [players, setPlayers] = useState([]);
  const [playerIds, setPlayerIds] = useState([]);
  const [tempPlayer, setTempPlayer] = useState();
  
  useEffect(() => {

    if( groupName === '' && route.params?.group ) {
      setGroupName(route.params.group);
    }

    if( route.params?.id ) {
        setGroupId(route.params.id);
    }

    if( route.params?.creatorId ) {
        setGroupCreator(route.params.creatorId);
    }
    
  }, []);
  
  useEffect(() => {
    if(groupId) {
      getPlayerIds();
    }
    }, [groupId]);

  useEffect(() => {
    if(playerIds.length !== 0) {
      playerIds.map((id) => {
        getPlayer(id); 
      })
    }
  }, [playerIds])
  
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
        setPlayers(temp);
      }
    }
  }, [tempPlayer])
    

  const getPlayerIds = async () => {
    if(groupId) {
      const docRef = doc(db, USERS_REF + "/" + groupCreator + "/groups", groupId); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
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
    
  return (
      <View style={styles.overlay}>
          <Header />
          <ScrollView contentContainerStyle={styles.scrollview}
        style={{marginBottom: 20}}>
          <Text style={[styles.title, {marginBottom: 25}]}>GROUP NAME: {groupName}</Text>
      <Text style={[styles.title, {marginTop: 30}]}>PLAYERS</Text>   
        {players.map((key,i) => (
          <View key={i} style={[styles.gameButton, {backgroundColor: '#f9bb00'}]}>
            <Text style={styles.buttonTextSettings2} >{players[i].name}</Text>
          </View>      
        ))}    
      </ScrollView>        
    </View>
  );
}