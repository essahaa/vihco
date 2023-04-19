import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
import styles from '../styles/style';
import Logo from "./Logo";
import { getAuth, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase/Config";

export default Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePress = () => {
        if(!email) {
            Alert.alert('Email is required');
        }
        else if(!password) {
            Alert.alert('Password is required');
        }
        else {
            try {
                signInWithEmailAndPassword(auth, email, password)
                onAuthStateChanged(auth, (user) => {
                    if(user) {
                        navigation.navigate('Home', {userUid: user.uid});
                    }
                });
            }catch(error) {
                console.log('Login failed. ', error.message);
                Alert.alert('Login failed. ', error.message);
            };
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
            {!loading ?
            <Pressable
                onPress={() => handlePress()}
                style={styles.buttonPrimary}
            >
                <Text style={[styles.buttonText, {fontSize: 20}]}>LOGIN</Text>
            </Pressable>
            :
            <Text style={styles.loggingLoading}>LOGGING IN...</Text>
            }
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
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                <Text style={[styles.forgotPass, {fontSize: 18}]}>Forgot password?</Text>
            </Pressable>
        </View>
    )
}