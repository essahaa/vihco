import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from '../styles/style';
import { logOut } from './Auth';
import Logo from './Logo';

export default function Settings({ navigation }) {

  const handlePress = () => {
    logOut();
    navigation.navigate('Login');
  }

  return (
    <View style={styles.overlay}>
      <Logo />
      <Text style={[styles.title, {marginBottom: 5}]}>Settings</Text>
      <Pressable
        onPress={() => navigation.navigate('Groups')}
        style={[styles.buttonSettings, { marginTop: 12, zIndex: 0 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT GROUPS</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('EditProfile')}
        style={[styles.buttonSettings, { marginTop: 12 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT PASSWORD</Text>
      </Pressable>
      <View style={[styles.flexBottom, {marginBottom: 75}]}>
      <Pressable
        onPress={() => handlePress()}
        style={[styles.buttonLogout]}
      >
        <Text style={styles.buttonTextLogout}>LOG OUT</Text>
      </Pressable>
      </View>
    </View>
  );
}