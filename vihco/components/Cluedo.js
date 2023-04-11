import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import style from '../styles/style';

const CluedoSheetScreen = () => {
  const [suspects, setSuspects] = useState([
    { name: 'Miss Scarlet', discovered: false },
    { name: 'Colonel Mustard', discovered: false },
    { name: 'Mrs. White', discovered: false },
    { name: 'Mr. Green', discovered: false },
    { name: 'Mrs. Peacock', discovered: false },
    { name: 'Professor Plum', discovered: false },
  ]);

  const [weapons, setWeapons] = useState([
    { name: 'Candlestick', discovered: false },
    { name: 'Dagger', discovered: false },
    { name: 'Lead Pipe', discovered: false },
    { name: 'Revolver', discovered: false },
    { name: 'Rope', discovered: false },
    { name: 'Wrench', discovered: false },
  ]);

  const [rooms, setRooms] = useState([
    { name: 'Kitchen', discovered: false },
    { name: 'Ballroom', discovered: false },
    { name: 'Conservatory', discovered: false },
    { name: 'Billiard Room', discovered: false },
    { name: 'Library', discovered: false },
    { name: 'Study', discovered: false },
    { name: 'Hall', discovered: false },
    { name: 'Lounge', discovered: false },
    { name: 'Dining Room', discovered: false },
  ]);

  const toggleClue = (category, index) => {
    switch (category) {
      case 'suspects':
        setSuspects(prevState => {
          const updatedSuspects = [...prevState];
          updatedSuspects[index].discovered = !updatedSuspects[index].discovered;
          return updatedSuspects;
        });
        break;
      case 'weapons':
        setWeapons(prevState => {
          const updatedWeapons = [...prevState];
          updatedWeapons[index].discovered = !updatedWeapons[index].discovered;
          return updatedWeapons;
        });
        break;
      case 'rooms':
        setRooms(prevState => {
          const updatedRooms = [...prevState];
          updatedRooms[index].discovered = !updatedRooms[index].discovered;
          return updatedRooms;
        });
        break;
    }
  };

  return (
    
    
    <View style={styles.container}>
        <Text style={style.headerText}>Cluedo sheet</Text>
        <ScrollView>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Suspects</Text>
        {suspects.map((suspect, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.clue,
              { backgroundColor: suspect.discovered ? '#af949400' : '#F9BB00' },
            ]}
            onPress={() => toggleClue('suspects', index)}
          >
            <Text style={styles.clueText}>{suspect.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Weapons</Text>
        {weapons.map((weapon, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.clue,
              { backgroundColor: weapon.discovered ? '#af949400' : '#F9BB00' },
            ]}
            onPress={() => toggleClue('weapons', index)}
          >
            <Text style={styles.clueText}>{weapon.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Rooms</Text>
        {rooms.map((room,
index) => (
<TouchableOpacity
key={index}
style={[
styles.clue,
{ backgroundColor: room.discovered ? '#af949400' : '#F9BB00' },
]}
onPress={() => toggleClue('rooms', index)}
>
<Text style={styles.clueText}>{room.name}</Text>
</TouchableOpacity>
))}
</View>
</ScrollView>
</View>

);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#4E9BB0',
},
category: {
marginBottom: 20,

},
categoryTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
clue: {
padding: 10,
borderRadius: 5,
borderWidth: 1,
borderColor: 'black',
marginBottom: 10, 
},
clueText: {
fontSize: 16,
},
});

export default CluedoSheetScreen;