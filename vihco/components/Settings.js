import { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, Button, TextInput } from 'react-native';
import { db, GROUPS_REF, USERS_REF } from '../firebase/Config';
import { collection, onSnapshot, orderBy, query, addDoc, where, getDocs, data, getDoc, doc, setDoc } from 'firebase/firestore';
import styles from '../styles/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from './Header';
import { logOut } from './Auth';
import Logo from './Logo';
/* import DropDownPicker from 'react-native-dropdown-picker'; */
import { Picker } from '@react-native-picker/picker';
import GroupPicker from './GroupPicker';
import { getAuth } from 'firebase/auth'


export default function Settings({ navigation }) {

  const handlePress = () => {
    logOut();
    navigation.navigate('Login');
  }
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([0]);
  const [items, setItems] = useState([]);
  const [groupname, setGroupname] = useState('')
  const [groupId, setGroupId] = useState('')
  const [currentUserId, setCurrentUserId] = useState('')
  const [addingGroup, setAddingGroup] = useState(false)
  const [sharedGroups, setSharedGroups] = useState([])
  const [sharedGroupNames, setSharedGroupNames] = useState([])
  const [myGroups, setMyGroups] = useState([])

  return (
    <View style={styles.overlay}>
      <Logo />
      <Text style={[styles.title, {marginBottom: 5}]}>Settings</Text>
      <Pressable
        onPress={() => navigation.navigate('Groups')}
        style={[styles.buttonSettings, { marginTop: 12, zIndex: 0 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT GROUPS</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate('EditProfile')}
        style={[styles.buttonSettings, { marginTop: 12 }]}
      >
        <Text style={styles.buttonTextSettings}>EDIT PASSWORD</Text>
      </Pressable>
      <View style={[styles.flexBottom, {marginBottom: 75}]}>
      <Pressable
        onPress={() => handlePress()}
        style={[styles.buttonLogout]}
      >
        <Text style={styles.buttonTextLogout}>LOG OUT</Text>
      </Pressable>
      </View>
      {/* <View style={styles.flexBottom}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.buttonSettings}
        >
          <Text style={styles.buttonTextSettings}>BACK</Text>
        </Pressable>
      </View> */}
    </View>
  );
}