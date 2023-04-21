import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import style from '../styles/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const CluedoSheetScreen = () => {
  const navigation = useNavigation();
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

  const renderClueOptions = (category) => {
    const options = category === 'suspects' ? suspects : category === 'weapons' ? weapons : rooms;
    const rows = [];
    for (let i = 0; i < options.length; i += 2) {
      rows.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            key={i}
            style={[
              styles.clue,
              { backgroundColor: options[i].discovered ? '#af949400' : '#F9BB00' },
            ]}
            onPress={() => toggleClue(category, i)}
          >
            <Text style={styles.clueText}>{options[i].name}</Text>
          </TouchableOpacity>
          {i + 1 < options.length && (
            <TouchableOpacity
              key={i + 1}
              style={[
                styles.clue,
                { backgroundColor: options[i + 1].discovered ? '#af949400' : '#F9BB00' },


        ]}
        onPress={() => toggleClue(category, i + 1)}
      >
        <Text style={styles.clueText}>{options[i + 1].name}</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}
return rows;
};

return (
<ScrollView contentContainerStyle={styles.container}>
<View style={{ flexDirection: 'row', marginBottom:10 }}>
    <View style={{alignSelf:'flex-start'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Sheets')}>
        <MaterialCommunityIcons style={styles.headerIcon} name="menu-left" size={24} color="white" />
      </TouchableOpacity>
    </View>
    <Text style={style.headerText}>Cluedo sheet</Text>
    </View>
 
<View style={styles.category}>
<MaterialCommunityIcons name="account" size={24} color="black" />
<Text style={styles.categoryTitle}>Suspects</Text>
</View>
<View style={styles.cluesContainer}>{renderClueOptions('suspects')}</View>


  <View style={styles.category}>
    <MaterialCommunityIcons name="pistol" size={24} color="black" />
    <Text style={styles.categoryTitle}>Weapons</Text>
  </View>
  <View style={styles.cluesContainer}>{renderClueOptions('weapons')}</View>

  <View style={styles.category}>
    <MaterialCommunityIcons name="home" size={24} color="black" />
    <Text style={styles.categoryTitle}>Rooms</Text>
  </View>
  <View style={styles.cluesContainer}>{renderClueOptions('rooms')}</View>

  
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
alignItems:'center',
paddingVertical: 5,
backgroundColor:'#4E9BB0'
},
category: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,

},
categoryTitle: {
fontSize: 24,
marginLeft: 10,
fontFamily:'timeburner',
},
cluesContainer: {
width: '100%',
paddingHorizontal: 20,
},
clue: {
flex: 1,
height: 100,
marginHorizontal: 5,
marginBottom: 10,
justifyContent: 'center',
alignItems: 'center',
borderRadius: 10,
borderWidth:1
},
clueText: {
fontSize: 20,
textAlign: 'center',
fontFamily:'timeburner'
},
});

export default CluedoSheetScreen;