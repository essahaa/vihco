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

            <Pressable >
                <Button
                title='Cluedo'
                onPress={() => navigation.navigate('Cluedo')}
                />
            </Pressable>
           
            <Pressable >
                <Button 
                    title="Groups"
                    onPress={() => navigation.navigate('Groups')}
                />
            </Pressable>
    </View>
  );
}