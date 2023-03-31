import { Text, View } from 'react-native';
import styles from '../styles/style';
import {  Text, View, Button, Pressable } from 'react-native';
import { logOut } from './Auth';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Pressable >
                <Button 
                    title="Logout"
                    onPress={logOut}
                />
            </Pressable>
    </View>
  );
}