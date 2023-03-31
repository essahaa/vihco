import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
import styles from '../styles/style';
import Logo from "./Logo";
import { signIn } from "./Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";

export default Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        
        if(!email) {
            Alert.alert('Email is required');
        }
        else if(!password) {
            Alert.alert('Password is required');
        }
        else {
            signIn(email, password);
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    navigation.navigate('Home', {userUid: user.uid});
                }
            });
        }
    };

    return (
        <View style={styles.overlay}>
            <Logo />
            <Text style={styles.text}>Login to your account</Text>
            <TextInput 
                style={styles.textInput}
                placeholder='Enter your email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
                keyboardType='email-address'
                autoCapitalize="none"
                placeholderTextColor='#4E9BB0'
            />
            <TextInput 
                style={styles.textInput}
                placeholder='Enter your password'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
                placeholderTextColor='#4E9BB0'
            />
            <Pressable
                onPress={() => handlePress()}
                style={styles.buttonPrimary}
            >
                <Text style={[styles.buttonText, {fontSize: 20}]}>LOGIN</Text>
            </Pressable>
            <View style={styles.flexCenter}>
            <Text style={styles.text}>Not a member?</Text>
            <Pressable
                onPress={() => navigation.navigate('Register')}
                style={styles.buttonSecondary}
            >
                <Text style={[styles.buttonText, {fontSize: 18}]}>REGISTER</Text>
            </Pressable>
            </View>
            <Pressable
            >
                <Text style={[styles.forgotPass, {fontSize: 18}]}>Forgot password?</Text>
            </Pressable>
        </View>
    )
}