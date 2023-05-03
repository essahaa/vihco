import { Text, View, ScrollView, Pressable } from 'react-native';
import Header from './Header';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/style';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, getDoc, where } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { LinearGradient } from 'expo-linear-gradient';
import GroupPicker from './GroupPicker';
import { getAuth } from 'firebase/auth';
import style from '../styles/style';
import ProfileGameStats from './ProfileGameStats';
import { onAuthStateChanged } from 'firebase/auth';

export default function Profile() {

  const [games, setGames] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('')
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([])
  const [sharedGroups, setSharedGroups] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [playerData, setPlayerData] = useState([])
  const [tempData, setTempData] = useState()
  const [groupIsShared, setGroupIsShared] = useState(false)

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setGroups([]);
      setGames([]);
      setMyGroups([]);
      setSharedGroups([]);
      setCurrentGroupId('');
      setPlayerData([]);
      if(user) {
        setUserId(auth.currentUser.uid)
      }else {
        setUserId('');
      }
    });
  }, [])
  
  useEffect(() => {
    if(userId !== ""){
      getUsername()
      getData()
    }
  }, [userId]);


  useEffect(() => {
    if(groupIsShared) {
      setGroupIsShared(false)
    }
    if(userId!=="" && currentGroupId !== ""){
      checkIsGroupShared()
    }
  }, [currentGroupId]);

  useEffect(() => {
    if(currentGroupId) {
      getGameData()
    }else {
      console.log("gamedata no")
    }
  }, [games, currentGroupId])

  useEffect(() => {
    if(groups.length !== 0 && currentGroupId === '') {
      setCurrentGroupId(groups[0].value)
    }
  }, [groups])

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

  const checkIsGroupShared = () => {
    let ids = [];
    sharedGroups.map((group) => {
      ids.push(group.value);
    })
    if(ids.includes(currentGroupId)) {
      setGroupIsShared(true);
    }else {
      setGroupIsShared(false);
      getGames()
    }
  };
  
  const getGames = async () => {
    setGames([])
    const gameref = USERS_REF + "/" +userId+ "/groups/" + currentGroupId + "/games"
      const q = query(collection(db, gameref))
      onSnapshot(q, (querySnapshot) => {
        setGames(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });
  }

  const getGameData = async () => {
    setPlayerData([])
    games.map((game) => {
      const gamesRef = USERS_REF + "/" + userId + "/groups/" + currentGroupId + "/games/" + game.id + "/users"
      const q = query(collection(db, gamesRef), where("userId", "==", userId))

      onSnapshot(q, (querySnapshot) => {
        setTempData(querySnapshot.docs.map(doc => ({
          id: doc.id,
          gameName: game.name,
          ...doc.data()
        })));
      });
    })
  }

  const getUsername = async () => {
    const docRef = doc(db, USERS_REF, userId); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data()
        setUsername(data.name)
    } else {
        console.log("No such user found!");
    }
}

  const getData = async () => {
    const q1 = query(collection(db, USERS_REF + "/" + userId + "/groups"))
    onSnapshot(q1, (querySnapshot) => {
      setMyGroups(querySnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      })));
    });

    const q2 = query(collection(db, USERS_REF + "/" + userId + "/sharedGroups"));
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
    <View style={[styles.container, {paddingTop:-20}]}>
    <Header />
    <View style={{backgroundColor:'#4e9bb0', width:'100%', marginTop:-30}}>
      <View>
        <LinearGradient  colors={['#4e9bb0' , '#112126']} locations={[0.6,0.4]} start={[0, 0]} end={[0, 1]} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 15 }}>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            <Ionicons name="person-circle" size={150} color="white" />
            <Text style={[styles.gameHeader, {textAlign: 'center', paddingLeft:0,paddingBottom: 20}]}>{username}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
 
    <View style={[styles.dropdown, {width:'60%', flexDirection: 'row', justifyContent: 'center',marginTop:6,marginBottom:10}]}>
      <Pressable onPress={() => getData()}>
          <GroupPicker groups={groups} onSelect={selectedValue => setCurrentGroupId(selectedValue)} />
      </Pressable>

    </View>
    <ScrollView>

  
    <View>
  
      <Text style={[styles.title, {textAlign: "center",marginTop:15, marginBottom:8}]}>My game statistics</Text>
      {groupIsShared ?
        <ProfileGameStats groupId={currentGroupId} userId={userId} />
      : 
      <View>
      {playerData.map((key,i) => (
        <View  key={i} style={[styles.gameButton, {height: 120}]}>
          <Text style={[styles.gameText,{marginTop:7}]}>{playerData[i].gameName}</Text>
        

          <View style={styles.flexRight}>
            <Text style={[style.gameText,{fontSize:15}]}>Wins: {playerData[i].win}</Text>
            <Text style={[style.gameText,{fontSize:15}]}>Losses: {playerData[i].loss}</Text>
            <Text style={[style.gameText,{fontSize:15}]}>
              Win/Loss ratio: {getRatio(playerData[i].win, playerData[i].loss)} 
            </Text>
          </View>
          
          
        </View>
           
      ))
      } 
      </View>
      }
    </View>
    </ScrollView>
  </View>
  
  );
}