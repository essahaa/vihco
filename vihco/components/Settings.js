import {  Text, View, Button, Pressable } from 'react-native';
import { logOut } from './Auth';


export default function Settings() {
  return (
    <View >
      <Text>Settings</Text>
      <Pressable >
                <Button 
                    title="Logout"
                    onPress={logOut}
                />
            </Pressable>
    </View>
  );
}