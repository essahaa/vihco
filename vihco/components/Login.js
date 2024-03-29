import React, { useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import styles from '../styles/style';
import Logo from "./Logo";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = getAuth();

    const handlePress = () => {
        if(!email) {
            Alert.alert('Email is required');
        }
        else if(!password) {
            Alert.alert('Password is required');
        }
        else {
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setTimeout(() => {
                        loadingScreen(user)
                    }, 1500); 
                    setLoading(true)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log('Login failed. ', errorMessage);
                    Alert.alert('Login failed. ', errorMessage);
                });
        }
    };

    const loadingScreen = (user) => {
        navigation.navigate('Home', {userUid: user.uid});
        setLoading(false)
    }

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
                <Text style={[styles.forgotPass, {fontSize: 18, marginBottom: 15}]}>Forgot password?</Text>
            </Pressable>
        </View>
    )
}