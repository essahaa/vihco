import { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, GAMES_REF } from '../firebase/Config';
import Header from './Header';
import styles from '../styles/style';

export default function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const q = query(collection(db, GAMES_REF), orderBy("id"))
    onSnapshot(q, (querySnapshot) => {
      setGames(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
    console.log(games);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {games.map((key, i) => (
              <Text style={styles.text} key={i}>{games[i].name}</Text>
        ))
        }
      </ScrollView>
      
    </View>
  );
}