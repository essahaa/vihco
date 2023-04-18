import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
// import { signUp } from "./Auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/Config";
import styles from '../styles/style';
import { signUp } from "./Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import Logo from "./Logo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// import styles from '../style/style';

export default EditProfile = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        if(!username) {
            Alert.alert('Username is required');
        }
        else if(!email) {
            Alert.alert('Email is required');
        }
        else if(!password) {
            Alert.alert('Password is required');
        }
        else if(!confirmPassword) {
            setPassword('');
            Alert.alert('Confirming password is required')
        }
        else if(password !== confirmPassword) {
            Alert.alert('Passwords do not match!')
        }
        else {
            signUp(username,email, password);
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    navigation.navigate('Home', {userUid: user.uid});
                }
            });
        }
    };

    return (
        <View style={styles.overlay}>
            <Logo/>
            <KeyboardAwareScrollView>
            <Text style={[styles.text, {marginBottom: 5}]}>Edit Profile</Text>
            <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='Enter a username'
                value={username}
                onChangeText={(username) => setUsername(username.trim())}
                placeholderTextColor='#4E9BB0'
            />
            <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='Enter your email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
                keyboardType='email-address'
                autoCapitalize="none"
                placeholderTextColor='#4E9BB0'
            />
            <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='Old password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
            <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='New password'
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
              <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='Confirm new password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
            <View style={[{flex: 1},{alignItems:'center'}]}>
                <Pressable
                    onPress={() => handlePress()}
                    style={styles.buttonPrimary}
                >
                    
                    <Text style={[styles.buttonText, {fontSize: 20}]}>SAVE</Text>
                </Pressable>
            </View>
            </KeyboardAwareScrollView>
            <View style={styles.flexBottom}>
        <Pressable
            onPress={() => navigation.navigate('Settings')}
            style={styles.buttonSettings}
        >
            <Text style={styles.buttonTextSettings}>BACK</Text>
        </Pressable>
      </View>
        </View>
    )
}