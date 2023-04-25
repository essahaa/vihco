import { useState, useEffect } from 'react';
import { Text, ScrollView, Pressable, View } from 'react-native';
import styles from '../styles/style';
import { query, onSnapshot, doc, getDoc, where, collection } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { useNavigation } from '@react-navigation/native';

export default ProfileGameStats = (groupId) => {
    const [games, setGames] = useState([]);
    const [creatorId, setCreatorId] = useState('');
    const [realGroupId, setRealGropId] = useState('');
    const [playerData, setPlayerData] = useState([])
    const [tempData, setTempData] = useState()

    const navigation = useNavigation();

    useEffect(() => {
        console.log("ids in sharedGames: " + groupId.userId + " " + groupId.groupId)

        if(groupId !== "") {
          getGames();
        }
        //console.log("juu")
      }, [])

      useEffect(() => {
        getGameData()
      }, [games])

      useEffect(() => {
        console.log("useeffect: " + JSON.stringify(tempData));
        if (!tempData) {
          console.log("tempdata no")
        } 
        else {
          let ids = [];
          console.log("useeffect playerdata map "+JSON.stringify(playerData));
          console.log("useeffect tempdata map "+JSON.stringify(tempData));
          playerData.map((player) => {
            ids.push(player.id)
          })
          console.log("ids: " + ids);
          if(ids.includes(tempData.id)) {
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
          
          console.log("playerdata use effect: " + JSON.stringify(playerData));
        
      }, [tempData])

    const getGames = async () => {
        const q = doc(db, USERS_REF + "/" + groupId.userId + "/sharedGroups", groupId.groupId )
        const docSnap = await getDoc(q);
        //console.log("ids in sharedGames: " + groupId.userId)
        //console.log("docsnap: " + JSON.stringify(docSnap.data()))

        if (docSnap.exists()) {
            //console.log("playerdata:", docSnap.data().players);
            const creatorId = docSnap.data().creatorId
            setCreatorId(creatorId);
            const realGroupId = docSnap.data().groupId
            setRealGropId(realGroupId);
            //console.log("sharedGroupids: " + creatorId + " " + realGroupId)
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
        console.log("games" +JSON.stringify(games));
    }

    const getGameData = async () => {
    
        games.map((game) => {
            console.log("get game data ids: "+ creatorId + " group id " + realGroupId + " gamename " + game.name + " current user " + groupId.userId);
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
            <Text style={[styles.gameText,{fontSize:15}]}>Losses {playerData[i].loss}</Text>
            <Text style={[styles.gameText,{fontSize:15}]}>
              Win/Loss ratio {(playerData[i].win / playerData[i].loss) ? (playerData[i].win / playerData[i].loss).toFixed(2) : 0}
            </Text>
          </View>
          
          
        </View>
           
      ))
      } 
    </ScrollView>
    )
}  