import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/style';

export default Game = ({navigation, route}) => {
    const [gameName, setGameName] = useState('');

    useEffect(() => {
        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }
    }, []);
    
    return (
      <View style={styles.container}>
        <View style={styles.gameTopBar}>
            <View style={{flexDirection: 'row'}}>
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
                <Text style={[styles.gameText, {fontSize: 24}]}>{gameName}</Text>
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
      </View>
    );
  }