import { Text, View,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';
import { Image } from 'react-native';

export default Header3 = ({text}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.listTop, {backgroundColor: '#112126'}]}>   
    <View style={[styles.flexHeaderCenter]}>
    </View>
    <View style={styles.flexHeaderRigth}>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  );
}