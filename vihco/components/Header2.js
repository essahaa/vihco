import { Text, View,TouchableOpacity  } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/style';

export default Header = ({gameName}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.listTop}>
             
    <View style={styles.flexHeaderCenter}>
    <Text style={[styles.text, {textAlign: 'left'}]}>{gameName}</Text>
    </View>
    <View style={styles.flexHeaderRigth}>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="cog" size={24} color="white" />
    </TouchableOpacity>
    </View>
    </View>
  );
}