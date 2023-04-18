import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/style';
import Table from './Table';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';

export default GameInfo = ({name, data, id}) => {
    const [winData, setWinData] = useState(data);

    const navigation = useNavigation();

    useEffect(() => {
        setWinData(data);
    }, [data]);
    
    return (
        <>
        <View style={styles.gameTopBar}>
        <Header gameName={name} />
            <View style={{flexDirection: 'row'}}>
                <View style={styles.flexBottom}>
                    <Text style={styles.gameHeader}>{name}</Text>
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
                        <Pressable>
                            <MaterialCommunityIcons
                                name='pencil-circle'
                                color={'#326472'}
                                size={55}
                                onPress={() => navigation.navigate("GameSettings", {gameName: name, gameId: id})}
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
            <Table data={winData}/>
        </View>
        </>
    );
  }