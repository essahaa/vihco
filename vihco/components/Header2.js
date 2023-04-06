import { Text, View,TouchableOpacity, Pressable  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header = ({gameName}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.listTop, {backgroundColor: '#4e9bb0', marginBottom: 0, paddingHorizontal: 0}]}>
             
    <View style={styles.flexHeaderCenter}>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
                name='menu-left'
                color={'white'}
                size={24}
            />
        </Pressable>
        <Text style={[styles.text, {textAlign: 'left'}]}>{gameName}</Text>
      </View>
    </View>
    <View style={styles.flexHeaderRigth}>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  );
}