import { StyleSheet, Text, View, Pressable, Button } from 'react-native';

export default function Sheets({navigation}) {
  return (
    <View >
      <Text>Sheets</Text>
      <Pressable >
                <Button 
                    title="Yatzi"
                    onPress={() => navigation.navigate('Yatzi')}
                />
            </Pressable>
    </View>
  );
}