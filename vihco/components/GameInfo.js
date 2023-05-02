import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/style';
import Table from './Table';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

export default GameInfo = ({name, data, id,groupId}) => {
    const [winData, setWinData] = useState(data);
    const [wins, setWins] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        setWinData(data);
        
        console.log("windata: " + JSON.stringify(data))
    }, [data]);

    useEffect(() => {
        if(winData) {
            countPlayedGames()
        }
    }, [winData])
    

    const countPlayedGames = () => {
        let sum = 0;
        winData.map((data) => {
            sum = sum + data.win;
        })
        setWins(sum);
    }
    
    return (
        <>
        <View>
        <Header gameName={name} />
            <View style={{flexDirection: 'row'}}>
                <View style={styles.flexBottom}>
                    <Text style={[styles.gameHeader, {marginLeft: 15}]}>{name}</Text>
                </View>
                <View style={[styles.flexRight]}>
                    <View style={{flexDirection: 'row'}}>
                        {/* <Pressable>
                            <MaterialCommunityIcons
                                name='account-circle'
                                color={'#326472'}
                                size={55}
                                //style={{backgroundColor: 'white', borderRadius: 100}}
                            />
                        </Pressable> */}
                        <Pressable style={{marginRight: 10}}>
                            <MaterialCommunityIcons
                                name='pencil-circle'
                                color={'#326472'}
                                size={55}
                                onPress={() => navigation.navigate("GameSettings", {gameName: name, gameId: id,groupID:groupId})}
                                //style={{backgroundColor: 'white', borderRadius: 100}}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        <View style={{flexDirection: 'row'}}>
            <View style={[styles.flexLeft, {paddingLeft: 15, marginVertical: 10}]}>
                <Text style={styles.text}>Games played: {wins}</Text>
            </View>
        </View>
        <View style={styles.table}>
            <Table data={winData}/>
        </View>
        </>
    );
  }