import React, { useState, useEffect } from 'react';
import styles from '../styles/style';
import { Text, View, Button, Pressable, ScrollView } from 'react-native';
import { logOut } from './Auth';
import Logo from './Logo';
/* import DropDownPicker from 'react-native-dropdown-picker'; */
import { doc, getDoc } from 'firebase/firestore';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import { Picker } from '@react-native-picker/picker';
import GroupPicker from './GroupPicker';


export default function Settings({ navigation }) {

  const handlePress = () => {
    logOut();
    navigation.navigate('Login');
  }
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, GROUPS_REF));
    onSnapshot(q, (querySnapshot) => {
      setGroups(querySnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      })));
    });
    console.log('groups:', groups);
  }, []);




  return (
    <View style={styles.overlay}>
      <Logo />
      <Text style={styles.text}>Settings</Text>
      <View style={[styles.dropdown]}>
      <GroupPicker groups={groups} onSelect={selectedValue => console.log(selectedValue)} />

      </View>

      <Pressable
        onPress={() => navigation.navigate('Groups')}
        style={[styles.buttonSettings, { marginTop: 10, zIndex: 0 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT GROUPS</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('EditProfile')}
        style={[styles.buttonSettings, { marginTop: 10 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT PROFILE</Text>
      </Pressable>
      <Pressable
        onPress={() => handlePress()}
        style={[styles.buttonLogout, { marginTop: 60 }]}
      >
        <Text style={styles.buttonTextLogout}>LOG OUT</Text>
      </Pressable>
      <View style={styles.flexBottom}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.buttonSettings}
        >
          <Text style={styles.buttonTextSettings}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}