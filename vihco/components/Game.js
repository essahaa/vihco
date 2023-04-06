import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Table, Row, Rows, Col, TableWrapper } from 'react-native-table-component';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db, GAMES_REF } from '../firebase/Config';
import styles from '../styles/style';
import Header from './Header2';

export default Game = ({navigation, route}) => {
    const [gameName, setGameName] = useState('');
    const [nameData, setNameData] = useState([]);
    const [winData, setWinData] = useState([]);

    useEffect(() => {

        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }

        const q = query(collection(db, GAMES_REF))
        onSnapshot(q, (querySnapshot) => {
            setWinData(querySnapshot.docs.map(doc => ({
                id: doc.id,
            ...doc.data()
            })));
        });
        //console.log(winData);

    }, []);

    const tableData = {
        tableHead: ['W', 'L', 'W/L'],
        tableNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'],
        tableData: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.gameTopBar}>
        <Header gameName={gameName} />
            <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                        name='menu-left'
                        color={'white'}
                        size={40}
                    />
                </Pressable>
                <View style={styles.flexRight}>
                    <Text style={styles.title}>Settings</Text>
                </View>
            </View>
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
        <View style={{flexDirection: 'row'}}>
            <View style={styles.table}>
                <Table borderStyle={{ borderWidth: 4, borderColor: '#112126' }}>
                    <TableWrapper style={{flexDirection: 'row'}}>
                        <Col data={['Name']} width={210} style={styles.tableCellHeader}
                            textStyle={[
                                {color: 'white'},
                                {fontFamily: 'timeburnerBold'},
                                {fontSize: 20},
                                {marginHorizontal: 15},
                                {textAlign: 'left'},
                                {paddingVertical: 6}
                            ]}
                        />
                        <Row data={tableData.tableHead} widthArr={[70, 70]} style={styles.tableCellHeader}
                            textStyle={[
                                {color: 'white'},
                                {fontFamily: 'timeburnerBold'},
                                {fontSize: 20},
                                {marginHorizontal: 15},
                                {textAlign: 'center'},
                                {paddingVertical: 6}
                            ]}
                        />
                    </TableWrapper>
                </Table>
                <ScrollView style={{marginTop: -4}}>
                    <Table borderStyle={{ borderWidth: 4, borderColor: '#112126' }}>
                        <TableWrapper style={{flexDirection: 'row'}}>
                            <Col data={tableData.tableNames} style={styles.tableCell} width={210}
                                textStyle={[
                                    {color: 'white'},
                                    {fontFamily: 'timeburnerBold'},
                                    {fontSize: 20},
                                    {marginHorizontal: 15},
                                    {textAlign: 'left'},
                                    {paddingVertical: 6}
                                ]}
                            />
                            <Rows data={tableData.tableData} style={styles.tableCell} widthArr={[70, 70]}
                                textStyle={[
                                    {color: 'white'},
                                    {fontFamily: 'timeburnerBold'},
                                    {fontSize: 20},
                                    {marginHorizontal: 15},
                                    {textAlign: 'center'},
                                    {paddingVertical: 6}
                                ]}
                            />
                        </TableWrapper>
                    </Table>
                </ScrollView>
            </View>
        </View>
      </View>
    );
  }