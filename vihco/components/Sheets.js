import { Text, View, Pressable, Button } from 'react-native';
import styles from '../styles/style';
import Rules from './Rules';

export default function Sheets({navigation}) {
  return (
    <View style={styles.container}>
    <Text style={[styles.title, {textAlign: 'center'}]}>Sheets & Rules</Text>
    <Pressable style={[styles.gameButton, {marginVertical: 10}]} onPress={() => navigation.navigate('Rules', { gameName: 'Yatzi' })}>
    <Text style={[styles.gameText, {textAlign: 'center'}]}>Yatzi</Text>
    </Pressable>

    <Pressable style={[styles.gameButton, {marginVertical: 10}]} onPress={() => navigation.navigate('Rules', { gameName: 'Cluedo' })}>
    <Text style={[styles.gameText, {textAlign: 'center'}]}>Cluedo</Text>
    </Pressable>

    <Pressable style={[styles.gameButton, {marginVertical: 10}]} onPress={() => navigation.navigate('Rules', { gameName: 'SevenOfClubs' })}>
    <Text style={[styles.gameText, {textAlign: 'center'}]}>Seven Of Clubs</Text>
    </Pressable>
    </View>
  );
}