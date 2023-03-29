import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
// import { signIn, signUp } from "./Auth";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/Config";
// import styles from '../style/style';


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
            // signIn(nickname,email, password);
            // onAuthStateChanged(auth, (user) => {
            //     if(user) {
            //         navigation.navigate('Todo', {userUid: user.uid});
            //     }
            // });
        }
    };

    return (
        <View >
            <Text >Login</Text>
            <Text >Login to your account</Text>
            <TextInput 
                
                placeholder='Enter your email*'
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
            <Pressable >
                <Button 
                    title="Login"
                    onPress={handlePress}
                />
            </Pressable>
            <Text >Not having account yet?</Text>
            <Pressable >
                <Button 
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                />
            </Pressable>
        </View>
    )
}