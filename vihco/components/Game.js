import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Config';
import GameInfo from './GameInfo';
import styles from '../styles/style';
import AddScores from './AddScores';

export default Game = ({navigation, route}) => {
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

    const inc = async (userId, field, value) => {
        const userRef = doc(db, "/games/" + gameId + "/users", userId);

        // Atomically increment the population of the city by 50.
        if(field == "win") {
            await updateDoc(userRef, {
                win: increment(value)
            });
        }else if(field == "loss") {
            await updateDoc(userRef, {
                loss: increment(value)
            });
        } 
    }
    
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
                <View style={[styles.listTop, {backgroundColor: '#4e9bb0'}]}>
                    <TouchableOpacity onPress={() => setAddingScores(false)}>
                        <View style={styles.flexLeft}>
                            <MaterialCommunityIcons style={styles.headerIcon} name="menu-left" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.flexHeaderCenter}>
                        <Text style={styles.headerText}>Add scores to</Text>
                    </View>
                    <View style={styles.flexHeaderRigth}>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.gameHeader, {textAlign: 'center'}]}>{gameName}</Text>
            </View>
            <View style={styles.table}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.tableBottomBorder, styles.tableCellName]}>
                    <Text style={styles.text}>Name</Text>
                </View>
                <View style={styles.tableBottomBorder}>
                    <Text style={styles.text}>W</Text>
                </View>
                <View style={styles.tableBottomBorder}>
                    <Text style={styles.text}>L</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollview}>
                {winData.map((key, i) => (
                <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={[styles.tableBottomBorder, styles.tableCellName]}>
                        <Text style={[styles.text, {fontSize: 20}]}>{winData[i].name}</Text>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        <Pressable style={styles.plusButton} onPress={() => inc(winData[i].id, "win", 1)}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        <Pressable style={styles.minusButton} onPress={() => inc(winData[i].id, "win", -1)}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        <Pressable style={styles.plusButton} onPress={() => inc(winData[i].id, "loss", 1)}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        <Pressable style={styles.minusButton} onPress={() => inc(winData[i].id, "win", -1)}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                </View>
                ))}
            </ScrollView>
            </View>
            </View>
            </>
            }
        </View>
    );
  }