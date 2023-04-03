import { Text, View,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.listTop}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.flexleft}>
          <MaterialCommunityIcons style={styles.headerIcon} name="play" size={24} color="white" />
        </View>
      </TouchableOpacity>
    <View style={styles.flexHeaderCenter}>
    <Text style={styles.headerText}>Add scores to</Text>
    </View>
    <View style={styles.flexHeaderRigth}>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  );
}