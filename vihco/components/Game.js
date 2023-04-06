import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import styles from '../styles/style';
import Header from './Header2';
import Table from './Table';

export default Game = ({navigation, route}) => {
    const [gameName, setGameName] = useState('');
    const [gameId, setGameId] = useState();
    const [nameData, setNameData] = useState([]);
    const [winData, setWinData] = useState([]);

    useEffect(() => {

        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }

        if( gameId === null && route.params?.id ) {
            setGameId(route.params.id);
            console.log(gameId);
        }

        const q = query(collection(db, "/games/" + gameId + "/users"))
        onSnapshot(q, (querySnapshot) => {
            setWinData(querySnapshot.docs.map(doc => ({
                id: doc.id,
            ...doc.data()
            })));
            console.log(winData);
        });
        

    }, []);

    const tableData = {
        tableHead: ['W', 'L', 'W/L'],
        tableNames: [winData.name],
        tableData: [
            [winData.win, winData.loss]
        ],
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.gameTopBar}>
        <Header gameName={gameName} />
            <View style={{flexDirection: 'row'}}>
                <View style={styles.flexBottom}>
                    <Text style={styles.gameHeader}>{gameName}</Text>
                </View>
                <View style={[styles.flexRight]}>
                    <View style={{flexDirection: 'row'}}>
                        <Pressable>
                            <MaterialCommunityIcons
                                name='account-circle'
                                color={'#326472'}
                                size={55}
                                //style={{backgroundColor: 'white', borderRadius: 100}}
                            />
                        </Pressable>
                        <Pressable>
                            <MaterialCommunityIcons
                                name='pencil-circle'
                                color={'#326472'}
                                size={55}
                                //style={{backgroundColor: 'white', borderRadius: 100}}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={[styles.flexLeft, {paddingLeft: 35}]}>
                <Text style={styles.text}>Games played: </Text>
            </View>
        </View>
        <View style={styles.table}>
            <Table/>
        </View>
      </View>
    );
  }