import { useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import styles from '../styles/style';
import { query, onSnapshot, doc, getDoc, where, collection } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';

export default ProfileGameStats = (groupId) => {
  const [games, setGames] = useState([]);
  const [creatorId, setCreatorId] = useState('');
  const [realGroupId, setRealGropId] = useState('');
  const [playerData, setPlayerData] = useState([])
  const [tempData, setTempData] = useState()

  useEffect(() => {
      if(groupId !== "") {
          setPlayerData([])
          getGames();
      }
    }, [groupId.groupId])

    useEffect(() => {
      getGameData()
    }, [games])

    useEffect(() => {
      if (!tempData || tempData.length == 0) {
        console.log("tempdata no")
      } 
      else {
        let ids = [];
        playerData.map((player) => {
          ids.push(player.id)
        })
        if(ids.includes(tempData[0].id)) {
          console.log("already game")
        }else {
        const temp = [...playerData]
        const player = {
          id: tempData[0].id,
          name: tempData[0].name,
          gameName: tempData[0].gameName,
          userId: tempData[0].userId,
          win: tempData[0].win,
          loss: tempData[0].loss
        }
        temp.push(player)
        setPlayerData(temp)
        }
      }      
    }, [tempData])

  const getGames = async () => {
      const q = doc(db, USERS_REF + "/" + groupId.userId + "/sharedGroups", groupId.groupId )
      const docSnap = await getDoc(q);

      if (docSnap.exists()) {
        const creatorId = docSnap.data().creatorId
        setCreatorId(creatorId);
        const realGroupId = docSnap.data().groupId
        setRealGropId(realGroupId);
        const q2 = query(collection(db, USERS_REF + "/" + creatorId + "/groups/" + realGroupId + "/games"))
        onSnapshot(q2, (querySnapshot) => {
            setGames(querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          });
      } else {
          console.log("shared group not found");
      }
  }

  const getGameData = async () => {
      games.map((game) => {
        const gamesRef = USERS_REF + "/" + creatorId + "/groups/" + realGroupId + "/games/" + game.id + "/users"
        const q = query(collection(db, gamesRef), where("userId", "==", groupId.userId))
        
        onSnapshot(q, (querySnapshot) => {
          setTempData(querySnapshot.docs.map(doc => ({
            id: game.id,
            gameName: game.name,
            ...doc.data()
          })));
        });
      })
  }

  const getRatio = (wins, losses) => {
    const ratio = (wins/losses).toFixed(2);
    if(isNaN(ratio)) {
        return 0;
    }else if(losses === 0) {
        return wins;
    }else return ratio;
  }

  return (
    <ScrollView 
    contentContainerStyle={styles.scrollview}
    style={{marginBottom: 20}}
    >
    {playerData.map((key,i) => (
        <View  key={i} style={[styles.gameButton, {height: 120}]}>
          <Text style={[styles.gameText,{marginTop:7}]}>{playerData[i].gameName}</Text>
        

          <View style={styles.flexRight}>
            <Text style={[styles.gameText,{fontSize:15}]}>Wins: {playerData[i].win}</Text>
            <Text style={[styles.gameText,{fontSize:15}]}>Losses: {playerData[i].loss}</Text>
            <Text style={[styles.gameText,{fontSize:15}]}>
              Win/Loss ratio:  {getRatio(playerData[i].win, playerData[i].loss)}
            </Text>
          </View>
          
          
        </View>
           
      ))
      } 
    </ScrollView>
    )
}  