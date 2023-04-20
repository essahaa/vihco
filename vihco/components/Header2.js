import { Text, View,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header2 = ({text}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.listTop, {backgroundColor: '#4e9bb0'}]}>
             <TouchableOpacity onPress={() => navigation.navigate('Sheets')}>
        <View style={styles.flexLeft}>
          <MaterialCommunityIcons style={styles.headerIcon} name="menu-left" size={24} color="white" />
        </View>
      </TouchableOpacity>
    <View style={styles.flexHeaderCenter}>
    <Text style={styles.headerText}>{text}</Text>
    </View>
    <View style={styles.flexHeaderRigth}>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  );
}