import styles from '../styles/style';
import {  Text, View, Button, Pressable } from 'react-native';
import { logOut } from './Auth';
import Logo from './Logo';

export default function Settings() {
  return (
    <View style={styles.overlay}>
      <Logo />
      <Text style={styles.text}>Settings</Text>
      <Pressable
          onPress={() => logOut()}
          style={styles.buttonLogout}
      >
          <Text style={styles.buttonTextLogout}>LOG OUT</Text>
      </Pressable>
      <View style={styles.flexBottom}>
        <Pressable
            style={styles.buttonSettings}
        >
            <Text style={styles.buttonTextSettings}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}