import { Text, View, ScrollView, Pressable } from 'react-native';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query, addDoc, doc, getDoc, where } from 'firebase/firestore';
import { db, USERS_REF, auth } from '../firebase/Config';
import { LinearGradient } from 'expo-linear-gradient';
import GroupPicker from './GroupPicker';
import { getAuth } from 'firebase/auth';

export default function Profile({navigation}) {

  const [games, setGames] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([])
  const [sharedGroups, setSharedGroups] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [playerData, setPlayerData] = useState([])
  const [tempData, setTempData] = useState()

  const auth = getAuth();

  useEffect(() => {
    setUserId(auth.currentUser.uid)
    console.log("joo")
  }, [])
  
  useEffect(() => {
    if(userId!==""){
      getUsername()
      const q = query(collection(db, USERS_REF+"/"+userId+"/groups"));
      onSnapshot(q, (querySnapshot) => {
        setGroups(querySnapshot.docs.map(doc => ({
          label: doc.data().name,
          value: doc.id
        })));
      });
      console.log('groups:', groups);
    }
  }, [userId]);


  useEffect(() => {
    if(userId!==""){
      console.log("currentgroupid "+currentGroupId);
      const gameref = USERS_REF + "/" +userId+ "/groups/" + currentGroupId + "/games"
      const q = query(collection(db, gameref))
      onSnapshot(q, (querySnapshot) => {
        setGames(querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });
    
    console.log("games: "+games);
    }
  }, [currentGroupId]);

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
      playerData.map((player) => {
        ids.push(player.id)
      })
      console.log("ids: " + ids);
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
      
      console.log("playerdata use effect: " + JSON.stringify(playerData));
    
  }, [tempData])
  
  

  const getGameData = async () => {
    
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
    
    console.log("temp playerdata "+ JSON.stringify(tempData));
    
    
  }

  const getUsername = async () => {
    const docRef = doc(db, USERS_REF, userId); 
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Username data:", docSnap.data());
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

    if(currentGroupId === '') {
      setCurrentGroupId(myGroups[0].value)
    }
}

  return (
    <View style={[styles.container, {paddingTop:-20}]}>
    <Header />
    <View style={{backgroundColor:'#4e9bb0', width:'100%', marginTop:-30}}>
      <Text style={[styles.gameHeader, {textAlign: 'center'}]}>My profile</Text>
      
      <View>
        <LinearGradient  colors={['#4e9bb0' , '#112126']} locations={[0.6,0.4]} start={[0, 0]} end={[0, 1]} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 15 }}>
          <View style={{ flexDirection:'row', alignItems:'center' }}>
            <MaterialCommunityIcons name="circle" size={150} color="white" />
            <Text style={[styles.usernameText, {textAlign: 'center', paddingLeft: 10,paddingBottom: 20}]}>{username}</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  
    <View style={[styles.dropdown, {width:'60%', flexDirection: 'row', justifyContent: 'center',marginTop:3}]}>
      <Pressable onPress={() => getData()}>
          <GroupPicker groups={groups} onSelect={selectedValue => setCurrentGroupId(selectedValue)} />
      </Pressable>

    </View>


  
    <View >
      <Text style={[styles.title, {textAlign: "center",marginTop:30}]}>My game statistics</Text>
      <View style={styles.scrollview}>
      <ScrollView 
      >
        {playerData.map((key,i) => (
          <View  key={i} style={[styles.gameButton, {height: 120}]}>
            <Text style={styles.gameText}>{playerData[i].gameName}</Text>
          

            <View style={styles.flexRight}>
              <Text>wins {playerData[i].win}</Text>
              <Text>losses {playerData[i].loss}</Text>
              <Text>
                win/loss ratio {(playerData[i].win / playerData[i].loss) ? (playerData[i].win / playerData[i].loss).toFixed(2) : 0}
              </Text>
            </View>
            
            
          </View>
              
        ))
        }
      </ScrollView>
      </View>
    </View>
  </View>
  
  );
}