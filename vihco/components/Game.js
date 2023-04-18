import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Config';
import GameInfo from './GameInfo';
import styles from '../styles/style';

export default Game = ({route}) => {
    const [gameName, setGameName] = useState('');
    const [gameId, setGameId] = useState();
    const [winData, setWinData] = useState([]);
    const [addingScoreData, setAddingScoreData] = useState([]);
    const [addingScores, setAddingScores] = useState(false);
    const [buttonState, setButtonState] = useState([]);
    
    useEffect(() => {
        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }

        if( route.params?.id ) {
            setGameId(route.params.id);
        }
    }, []);
    
    useEffect(() => {
        if(winData.length === 0 && gameId) {
            const q = query(collection(db, "/games/" + gameId + "/users"), orderBy("win", "desc"))
            onSnapshot(q, (querySnapshot) => {
                setWinData(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                ...doc.data()
                })));
            });
        }
        if(addingScoreData.length === 0 && gameId) {
            const q = query(collection(db, "/games/" + gameId + "/users"))
            onSnapshot(q, (querySnapshot) => {
                setAddingScoreData(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })));
            });
        }
    }, [gameId]);

    useEffect(() => {
        const row = [];
        for(let i=0; i<addingScoreData.length; i++) {
            row.push([0,0]);
        }
        setButtonState(row);
    }, [addingScoreData.length, addingScores]);

    function handlePress(i, x, userId, field, value) {
        inc(userId, field, value);
        let row = [...buttonState];
        row[i][x] = row[i][x] + value;
        setButtonState(row);
    }

    const inc = async (userId, field, value) => {
        const userRef = doc(db, "/games/" + gameId + "/users", userId);

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
            <GameInfo name={gameName} data={winData} id={gameId}/>
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
                <View style={[styles.listTop, {backgroundColor: '#4e9bb0', marginBottom: 10}]}>
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
                {addingScoreData.map((key, i) => (
                <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={[styles.tableBottomBorder, styles.tableCellName]}>
                        <Text style={[styles.text, {fontSize: 20}]}>{addingScoreData[i].name}</Text>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        {buttonState[i][0] === 0 ?
                        <Pressable style={styles.plusButton} onPress={() => handlePress(i, 0, addingScoreData[i].id, "win", 1)}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        :
                        <Pressable style={[styles.plusButton, {backgroundColor: '#F9BB00'}]} onPress={() => handlePress(i, 0, addingScoreData[i].id, "win", 1)}>
                            <Text style={styles.scoreNum}>{buttonState[i][0]}</Text>
                        </Pressable>
                        }
                        <Pressable style={styles.minusButton} onPress={() => handlePress(i, 0, addingScoreData[i].id, "win", -1)}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        {buttonState[i][1] === 0 ?
                        <Pressable style={styles.plusButton} onPress={() => handlePress(i, 1, addingScoreData[i].id, "loss", 1)}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        :
                        <Pressable style={[styles.plusButton, {backgroundColor: '#F9BB00'}]} onPress={() => handlePress(i, 1, addingScoreData[i].id, "loss", 1)}>
                            <Text style={styles.scoreNum}>{buttonState[i][1]}</Text>
                        </Pressable>
                        }
                        <Pressable style={styles.minusButton} onPress={() => handlePress(i, 1, addingScoreData[i].id, "loss", -1)}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                </View>
                ))}
            </ScrollView>
            </View>
            </View>
            <Pressable
                onPress={() => setAddingScores(false)}
                style={styles.buttonScores}
            >
                <Text style={[styles.buttonText, {fontSize: 20}]}>DONE</Text>
            </Pressable>
            </>
            }
        </View>
    );
  }