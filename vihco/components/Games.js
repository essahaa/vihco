import { Text, View } from 'react-native';
import Header from './Header';
import styles from '../styles/style';

export default function Games() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Games</Text>
    </View>
  );
}