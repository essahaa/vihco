import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import GameInfo from './GameInfo';
import styles from '../styles/style';
import AddScores from './AddScores';

export default Game = ({route}) => {
    const [gameName, setGameName] = useState('');
    const [gameId, setGameId] = useState();
    const [winData, setWinData] = useState([]);
    const [addingScores, setAddingScores] = useState(false);
    
    useEffect(() => {
        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }

        if( route.params?.id ) {
            setGameId(route.params.id);
        }
    }, []);
    
    useEffect(() => {
        if(gameId) {
            const q = query(collection(db, "/games/" + gameId + "/users"), orderBy("win", "desc"))
            onSnapshot(q, (querySnapshot) => {
                setWinData(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                ...doc.data()
                })));
            });
        }
    }, [gameId]);
    
    return (
        <View style={styles.container}>
            {!addingScores ?
            <>
            <GameInfo name={gameName} data={winData}/>
            <Pressable
                onPress={() => setAddingScores(true)}
                style={styles.buttonScores}
            >
                <Text style={[styles.buttonText, {fontSize: 20}]}>ADD SCORES</Text>
            </Pressable>
            </>
            :
            <>
            <View style={styles.gameTopBar}>
                <Header/>
                <Text style={[styles.gameHeader, {textAlign: 'center'}]}>Name</Text>
            </View>
            <AddScores id={gameId} userData={winData}/>
            </>
            }
        </View>
    );
  }