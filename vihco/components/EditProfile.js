import React, { useState } from "react";
import { View, Text, TextInput, Alert, Button, Pressable } from "react-native";
import { updatePassword, reauthenticateWithCredential, getAuth,EmailAuthProvider} from "firebase/auth";
import { auth, firestore, db, USERS_REF } from "../firebase/Config";
import styles from "../styles/style";
import Logo from "./Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, updateDoc } from "@firebase/firestore";

export default EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const auth = getAuth();

  const saveChanges = async () => {
    const user = auth.currentUser
        const credential = EmailAuthProvider.credential(
            email,
            password
        );
        await reauthenticateWithCredential(user, credential);
        
    if (newPassword == confirmNewPassword && newPassword !== '') {
        console.log(newPassword)

    updatePassword(user, newPassword).then(() => {
        console.log("pw changed")

    }).catch((error) => {

        console.log("failzzzzzzz")
    })
}};


  return (
    <View style={styles.overlay}>
      <Logo/>
      <KeyboardAwareScrollView>
        <Text style={[styles.text, {textAlign: 'center'}, {marginBottom: 5}, {marginTop: 10}]}>Change password</Text>
         {/* <TextInput 
          style={[styles.textInput, {marginVertical: 5}]}
          placeholder='Enter username'
          value={username}
          onChangeText={(username) => setUsername(username.trim())}
          placeholderTextColor='#4E9BB0'
        /> */}
        <TextInput 
          style={[styles.textInput, {marginVertical: 8}, {marginTop: 11}]}
          placeholder='Enter your email'
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          keyboardType='email-address'
          autoCapitalize="none"
          placeholderTextColor='#4E9BB0'
        /> 
         <TextInput 
          style={[styles.textInput, {marginVertical: 8}]}
          placeholder='Enter your current password'
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          placeholderTextColor='#4E9BB0'
        />
        <TextInput 
          style={[styles.textInput, {marginVertical: 8}]}
          placeholder='Enter a new password'
          value={newPassword}
          onChangeText={(newPassword) => setNewPassword(newPassword)}
          secureTextEntry={true}
          placeholderTextColor='#4E9BB0'
        />
        <TextInput 
          style={[styles.textInput, {marginVertical: 8}]}
          placeholder='Confirm new password'
          value={confirmNewPassword}
          onChangeText={(confirmNewPassword) => setConfirmNewPassword(confirmNewPassword)}
          secureTextEntry={true}
          placeholderTextColor='#4E9BB0'
        />
        <View style={[{flex: 1},{alignItems:'center'}]}>
          <Pressable
            onPress={() => saveChanges()}
            style={[styles.buttonPrimary, {marginTop: 24}]}
          >
            <Text style={[styles.buttonText, {fontSize: 20}]}>SAVE</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
      <Text style={styles.text}></Text>
      <Pressable
        onPress={() => navigation.navigate('Settings')}
        style={[styles.buttonSettings, {marginBottom: 16}]}
      >
        <Text style={[styles.buttonText, {fontSize: 18}]}>BACK</Text>
      </Pressable>
    </View>
  )
}