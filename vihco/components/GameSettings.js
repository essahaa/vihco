import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { updateDoc, doc, query, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import styles from '../styles/style';
import Header from './Header';
import { db, GAMES_REF } from '../firebase/Config';

export default GameSettings = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [newName, setNewName] = useState('');
    const [users, setUsers] = useState([]);

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
    
    /* const resetScores = async () => {
        try {
            const q = query(collection(db, "/games/" + id + "/users"))
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map((user) => ({
                    updateDoc(doc(db, "/games/" + id + "/users", user.id), {
                        win: 0,
                        loss: 0
                    })
            }))}).then(
            Alert.alert('Scores reset',
            "Success", [
                {text: 'OK', onPress: () => navigation.navigate("Games")},
            ]))
        }catch (error) {
            console.log(error.message);
        }
    } */

    const deleteGame = async () => {
        try {
            const q = query(collection(db, "/games/" + id + "/users"))
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map(function(user) {
                    deleteDoc(doc(db, "/games/" + id + "/users", user.id));
                });
            }).then(
                deleteDoc(doc(db, GAMES_REF, id)).then(
                    Alert.alert('Game deleted',
                    "", [
                        {text: 'OK', onPress: () => navigation.navigate("Games")},
                    ])
                )
            )
        }catch (error) {
            console.log(error.message);
        }
    }

    const handleDeletePress = () => {
        Alert.alert('Delete game?',
        `Are you sure you want to delete game "` + name + `"?` +
        `\nThis action cannot be undone.`, [
                {
                text: 'CANCEL',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                {text: 'DELETE', onPress: () => deleteGame()},
            ])
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
                    onPress={() => changeName()}
                    style={styles.buttonPrimary}
                    >
                    <Text style={[styles.buttonText, {fontSize: 16, textAlign: 'center'}]}>SAVE NEW NAME</Text>
                </Pressable>
                <Pressable
                    onPress={() => resetScores()}
                    style={[styles.buttonSettings, {marginTop: 60}]}
                    >
                    <Text style={[styles.buttonTextSettings, {paddingVertical: 5}]}>RESET SCORES</Text>
                </Pressable>
                <Pressable
                    onPress={handleDeletePress}
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