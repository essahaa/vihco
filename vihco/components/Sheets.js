import { Text, View, Pressable, Button } from 'react-native';
import styles from '../styles/style';
import Rules from './Rules';
import Header from './Header';

export default function Sheets({navigation}) {
  return (
    <View style={styles.container}>
      <Header/>
    <Text style={[styles.title, {textAlign: 'center',marginBottom:50,marginTop:45,fontSize:24}]}>Sheets<Text style={[{ color: '#F9BB00' }, {fontSize: 24}]}> & </Text><Text>Rules</Text></Text>
    <Pressable style={[styles.gameButton, {marginTop: 20,marginVertical:10}]} onPress={() => navigation.navigate('Rules', { gameName: 'Yatzi' })}>
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