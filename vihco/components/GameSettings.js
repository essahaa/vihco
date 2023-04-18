import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import styles from '../styles/style';
import Header from './Header';
import { db, GAMES_REF } from '../firebase/Config';

export default GameSettings = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [newName, setNewName] = useState('');

    useEffect(() => {
        if( name === '' && route.params?.gameName ) {
            setName(route.params.gameName);
        }

        if( id === '' && route.params?.gameId ) {
            setId(route.params.gameId);
        }
    }, [route.params.gameName]);

    const changeName = async () => {
        try {
            if(newName.trim() !== "") {
              await updateDoc(doc(db, GAMES_REF, id), {
                name: newName
            }).then(
                Alert.alert('Name changed',
                `Game name changed from "` + name + `" to "` + newName +
                `".\n\nReturning to Games list.`, [
                    {text: 'OK', onPress: () => navigation.navigate("Games")},
                ])
            )}
        }catch (error) {
            console.log(error.message);
        }
    }
    
    
    return (
        <View style={styles.container}>
            <View style={styles.gameTopBar}>
                <Header text={name + " settings"}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <Text style={[styles.text, {textAlign: 'center', marginTop: 20}]}>Change game name</Text>
                <TextInput 
                    style={styles.textInput}
                    placeholder={name}
                    value={newName}
                    onChangeText={(input) => setNewName(input)}
                    autoCapitalize="none"
                    placeholderTextColor='#4E9BB0'
                />
                <Pressable
                    onPress={changeName}
                    style={styles.buttonPrimary}
                    >
                    <Text style={[styles.buttonText, {fontSize: 16, textAlign: 'center'}]}>SAVE NEW NAME</Text>
                </Pressable>
                <Pressable
                    //onPress={addPlayer}
                    style={[styles.buttonSettings, {marginTop: 60}]}
                    >
                    <Text style={[styles.buttonTextSettings, {paddingVertical: 5}]}>RESET SCORES</Text>
                </Pressable>
                <Pressable
                    //onPress={addPlayer}
                    style={[styles.buttonLogout, {marginTop: 20}]}
                    >
                    <Text style={styles.buttonTextLogout}>DELETE GAME</Text>
                </Pressable>
                
            </View>
            <View style={[styles.flexBottom, {marginBottom: 20}]}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.buttonSettings}
                >
                    <Text style={styles.buttonTextSettings}>BACK</Text>
                </Pressable>
            </View>
        </View>
    );
  }