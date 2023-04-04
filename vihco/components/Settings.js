import React, { useState } from 'react';
import styles from '../styles/style';
import {  Text, View, Button, Pressable, ScrollView } from 'react-native';
import { logOut } from './Auth';
import Logo from './Logo';
import DropDownPicker from 'react-native-dropdown-picker';
import { doc, getDoc } from 'firebase/firestore';

export default function Settings({navigation}) {

  const handlePress = () => {
    logOut();
    navigation.navigate('Login');
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid', parent: 'spain'},
    {label: 'Barcelona', value: 'barcelona', parent: 'spain'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome', parent: 'italy'},

    {label: 'Finland', value: 'finland'}
  ]);

  return (
    <View style={styles.overlay}>
      <Logo />
      <Text style={styles.text}>Settings</Text>
      <DropDownPicker 
        style = {styles.dropdown}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        multiple={true}
        textStyle={styles.buttonTextSettings}

      />
      <Pressable
          onPress={() => handlePress()}
          style={styles.buttonSettings}
      >
          <Text style={styles.buttonTextSettings}>EDIT GROUPS</Text>
      </Pressable>
      <Pressable
          onPress={() => handlePress()}
          style={styles.buttonLogout}
      >
          <Text style={styles.buttonTextLogout}>LOG OUT</Text>
      </Pressable>
      <View style={styles.flexBottom}>
        <Pressable
            style={styles.buttonSettings}
        >
            <Text style={styles.buttonTextSettings}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}