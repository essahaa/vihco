import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import styles from '../styles/style';

export default Group = ({route}) => {
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('')
    
    useEffect(() => {
        if( groupName === '' && route.params?.group ) {
            setGroupName(route.params.group);
        }

        if( route.params?.id ) {
            setGroupId(route.params.id);
        }
    }, []);
    
   

    
    
    return (
        <View style={styles.container}>
            
            
           
        </View>
    );
  }