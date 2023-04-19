import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import { auth, firestore, db, USERS_REF } from "../firebase/Config";
import styles from "../styles/style";
import Logo from "./Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, doc, updateDoc } from "@firebase/firestore";

export default ForgotPassword = ({ navigation }) => {
    const auth = getAuth();
    const [email, setEmail] = useState("");

    const ResetPassword = () => {
        console.log("reset email sent to " + email);
        sendPasswordResetEmail(auth, email, null)
          .then(() => {
            alert("reset email sent to " + email);
          })
          .catch(function (e) {
            console.log(e);
          });
      };

    return (
      <View style={styles.overlay}>
        <Logo/>
        <KeyboardAwareScrollView>
          <Text style={[styles.text, {textAlign: 'center'}, {marginBottom: 8}, {marginTop: 10}]}>Forgot password? </Text>
          <TextInput 
            style={[styles.textInput, {marginVertical: 5}, {marginTop: 5}]}
            placeholder='Enter your email'
            value={email}
            onChangeText={(email) => setEmail(email.trim())}
            keyboardType='email-address'
            autoCapitalize="none"
            placeholderTextColor='#4E9BB0'
          /> 
          <View style={[{flex: 1},{alignItems:'center'}]}>
            <Pressable
              onPress={() => ResetPassword()}
              style={[styles.buttonPrimary, {marginTop: 16}]}
            >
              <Text style={[styles.buttonText, {fontSize: 20}]}>RESET PASSWORD</Text>
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
        <Text style={styles.text}></Text>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={[styles.buttonPrimary, {marginBottom: 20}]}
        >
          <Text style={[styles.buttonText, {fontSize: 18}]}>BACK</Text>
        </Pressable>
      </View>
    )
  }