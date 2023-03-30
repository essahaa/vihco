import { Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header = () => {
    return (
        <View >
            <MaterialCommunityIcons name="cog" size={24} color="black" />
        <Text style={styles.text}>header</Text>
      </View>
    );
}