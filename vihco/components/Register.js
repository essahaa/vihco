import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
// import { signUp } from "./Auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/Config";
// import styles from '../style/style';

export default Register = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = () => {
        if(!nickname) {
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
            // signUp(username,email, password);
            // onAuthStateChanged(auth, (user) => {
            //     if(user) {
            //         navigation.navigate('Todo', {userUid: user.uid});
            //     }
            // });
        }
    };

    return (
        <View >
            <Text >Register</Text>
            <Text >Create an account</Text>
            <TextInput 
                
                placeholder='Username'
                value={username}
                onChangeText={(username) => setUsername(username.trim())}
            />
            <TextInput 
                
                placeholder='Enter your email'
                value={email}
                onChangeText={(email) => setEmail(email.trim())}
                keyboardType='email-address'
                autoCapitalize="none"
            />
            <TextInput 
                
                placeholder='Enter your password*'
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={true}
            />
            <TextInput 
                
                placeholder='Confirm password*'
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
            />
            <Pressable >
                <Button 
                    title="Register"
                    onPress={handlePress}
                />
            </Pressable>
            <Text >Already have an account?</Text>
            <Pressable >
                <Button 
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </Pressable>
        </View>
    )
}