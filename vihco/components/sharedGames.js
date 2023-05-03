import { useState, useEffect } from 'react';
import { Text, ScrollView, Pressable, } from 'react-native';
import styles from '../styles/style';
import { query, onSnapshot, doc, getDoc, collection } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


export default sharedGames = (groupId) => {
    const [games, setGames] = useState([]);
    const [creatorId, setCreatorId] = useState('');
    const [realGroupId, setRealGropId] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        if(groupId !== "") {
          getGames();
        }
      }, [groupId.groupId])

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

  return (
    <ScrollView 
    contentContainerStyle={styles.scrollview}
    style={{marginBottom: 20}}
    >
    {games.map((key, i) => (
      <Pressable
        key={i}
        style={styles.gameButton}
        onPress={() => navigation.navigate('Game', {game: games[i].name, id: games[i].id, groupId: realGroupId, userId: creatorId})}
      >
          <Text style={[styles.gameText, {marginRight: 10}]}>{games[i].name}<Text>  </Text> 
              <MaterialIcons style={[styles.flexRight]} name="arrow-forward-ios" size={18} color="white" />
              </Text> 
      </Pressable>
    ))
    }
    </ScrollView>
    )
}  