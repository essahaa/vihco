import { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { updateDoc, doc, query, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import styles from '../styles/style';
import Header from './Header';
import { db, USERS_REF } from '../firebase/Config';
import { getAuth } from 'firebase/auth';

export default GameSettings = ({navigation, route}) => {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [newName, setNewName] = useState('');
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentGroupId, setCurrentGroupId]=useState('')

    const auth = getAuth();

  useEffect(() => {
    setCurrentUserId(auth.currentUser.uid)
  }, []);

    useEffect(() => {
        if( name === '' && route.params?.gameName ) {
            setName(route.params.gameName);
        }

        if( id === '' && route.params?.gameId ) {
            setId(route.params.gameId);
        }
        if( currentGroupId === '' && route.params?.groupID ) {
            setCurrentGroupId(route.params.groupID);
        }
      
    }, [route.params.gameName]);

    const changeName = async () => {
        try {
            const gameref=USERS_REF+"/"+currentUserId+"/groups/"+currentGroupId+"/games/"+id
            if(newName.trim() !== "") {
              await updateDoc(doc(db, gameref), {
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
            const gameref=USERS_REF+"/"+currentUserId+"/groups/"+currentGroupId+"/games/"+id
            const q = query(collection(db,gameref+"/users"))
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.docs.map(function(user) {
                    deleteDoc(doc(db, gameref + "/users", user.id));
                });
            }).then(
                deleteDoc(doc(db, gameref)).then(
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
        <View style={styles.overlay}>
            <View>
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
                {/* <Pressable
                    onPress={() => resetScores()}
                    style={[styles.buttonSettings, {marginTop: 60}]}
                    >
                    <Text style={[styles.buttonTextSettings, {paddingVertical: 5}]}>RESET SCORES</Text>
                </Pressable> */}
                <Pressable
                    onPress={handleDeletePress}
                    style={[styles.buttonLogout, {marginTop: 100}]}
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