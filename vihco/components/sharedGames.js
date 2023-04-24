import { useState, useEffect } from 'react';
import { Text, ScrollView, Pressable, } from 'react-native';
import styles from '../styles/style';
import { query, onSnapshot, doc, getDoc, where, collection } from 'firebase/firestore';
import { db, USERS_REF } from '../firebase/Config';
import { useNavigation } from '@react-navigation/native';

export default sharedGames = (groupId) => {
    const [games, setGames] = useState([]);
    const [creatorId, setCreatorId] = useState('');
    const [realGroupId, setRealGropId] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        console.log("ids in sharedGames: " + groupId.userId + " " + groupId.groupId)

        if(groupId !== "") {
          getGames();
        }
        //console.log("juu")
      }, [])

    const getGames = async () => {
        const q = doc(db, USERS_REF + "/" + groupId.userId + "/sharedGroups", groupId.groupId )
        const docSnap = await getDoc(q);
        console.log("ids in sharedGames: " + groupId.userId)
        console.log("docsnap: " + JSON.stringify(docSnap.data()))

        if (docSnap.exists()) {
            //console.log("playerdata:", docSnap.data().players);
            const creatorId = docSnap.data().creatorId
            setCreatorId(creatorId);
            const realGroupId = docSnap.data().groupId
            setRealGropId(realGroupId);
            console.log("sharedGroupids: " + creatorId + " " + realGroupId)
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
          <Text style={styles.gameText}>{games[i].name}</Text>
      </Pressable>
    ))
    }
    </ScrollView>
    )
}  