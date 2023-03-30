import { Text, View, Pressable, Button } from 'react-native';
import styles from '../styles/style';

export default function Sheets({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sheets</Text>
      <Pressable >
                <Button 
                    title="Yatzi"
                    onPress={() => navigation.navigate('Yatzi')}
                />
            </Pressable>
    </View>
  );
}