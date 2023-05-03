import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import styles from '../styles/style';
import { signUp } from "./Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import Logo from "./Logo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default Register = ({navigation}) => {
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
            <Text style={[styles.text, {marginBottom: 5}]}>Create an account</Text>
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
                placeholder='Enter a password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
            <TextInput 
                style={[styles.textInput, {marginVertical: 5}]}
                placeholder='Confirm password'
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
            <View style={[{flex: 1},{alignItems:'center'}]}>
                <Pressable
                    onPress={() => handlePress()}
                    style={[styles.buttonPrimary,{marginBottom:110}]}
                >
                    
                    <Text style={[styles.buttonText, {fontSize: 20}]}>REGISTER</Text>
                </Pressable>
                <Text style={styles.text}>Already have an account?</Text>
            <Pressable
                onPress={() => navigation.navigate('Login')}
                style={styles.buttonSecondary}
            >
                <Text style={[styles.buttonText, {fontSize: 18}]}>LOGIN</Text>
            </Pressable>
            </View>
            
            </KeyboardAwareScrollView>
            
        </View>
    )
}