import React, { useState } from 'react';
import { View, Modal, StyleSheet , Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import style from '../styles/style';

const RollDicePopup = ({ visible, onClose }) => {
  const [diceValues, setDiceValues] = useState([1, 1, 1, 1, 1]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [lockedDice, setLockedDice] = useState([]);

  const rollDice = () => {
    const newDiceValues = diceValues.map((value, index) => {
      if (lockedDice.includes(index)) {
        return value;
      } else {
        return Math.floor(Math.random() * 6) + 1;
      }
    });
    setDiceValues(newDiceValues);
    setRollsLeft(rollsLeft - 1);
  };

  const toggleLock = (index) => {
    if (lockedDice.includes(index)) {
      setLockedDice(lockedDice.filter((lockedIndex) => lockedIndex !== index));
    } else {
      setLockedDice([...lockedDice, index]);
    }
  };

  const resetDice = () => {
    setDiceValues([1, 1, 1, 1, 1]);
    setRollsLeft(3);
    setLockedDice([]);
  };

  const canRoll = rollsLeft > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[{backgroundColor:'#4E9BB0',paddingVertical: 10,paddingHorizontal: 20,width: '100%'}]}>
        <TouchableOpacity onPress={() => onClose()}>
          <View style={styles.flexLeft}>
            <MaterialCommunityIcons style={styles.headerIcon} name="menu-left" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
      
      
        <View style={styles.diceContainer}>
        
          {diceValues.map((value, index) => (
            <MaterialCommunityIcons
              key={index}
              name={`dice-${value}`}
              size={50}
              color={lockedDice.includes(index) ? '#f9bb0094' : '#F9BB00'}
              style={{ marginRight: 10 }}
              onPress={() => toggleLock(index)}
            />
          ))}
        </View>
        <MaterialCommunityIcons
          name="dice-multiple"
          size={110}
          color={canRoll ? '#F9BB00' : '#f9bb0094'}
          style={styles.rollButton}
          onPress={canRoll ? rollDice : null}
        />
        <MaterialCommunityIcons
          name="refresh"
          size={70}
          color="#F9BB00"
          style={styles.resetButton}
          onPress={resetDice}
        />
        <Text style={style.gameText}>Throws left:</Text>
        <View style={styles.rollsLeftContainer}>
          <MaterialCommunityIcons
            name="dice-3"
            size={40}
            color="#F9BB00"
            style={{ marginRight: 5 }}
          />
          <MaterialCommunityIcons
            name={`numeric-${rollsLeft}`}
            size={40}
            color="#F9BB00"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#4E9BB0'
  },
  diceContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  rollButton: {
    marginTop: 50,
  },
  resetButton: {
    marginTop: 20,
  },
  rollsLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RollDicePopup;