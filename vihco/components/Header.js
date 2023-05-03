import { View,TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header = () => {

  const navigation = useNavigation();

  return (
    <View style={[styles.listTop, {backgroundColor: '#4e9bb0'}]}>
             <TouchableOpacity onPress={() => navigation.goBack()}>

        <View style={[styles.flexLeft]}>
          <MaterialCommunityIcons style={styles.headerIcon} name="menu-left" size={24} color="white" />
        </View>
      </TouchableOpacity>
    <View style={[styles.flexHeaderCenter]}>
    <Image style= {{flex:1 , width: undefined, height: undefined, resizeMode: 'contain'}} source={require('../assets/images/logo_valk.png')}/>
    </View>
    <View style={[styles.flexHeaderRigth]}>  
    <View>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
    </View>
  );
}