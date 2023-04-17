import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import style from '../styles/style';
import { FontAwesome5 } from '@expo/vector-icons';
import RollDicePopup from './RollDicePopUp';

const categories = [
  "Ones", "Twos", "Threes", "Fours", "Fives", "Sixes",
  "Three of a Kind", "Four of a Kind", "Full House",
  "Small Straight", "Large Straight", "Yahtzee", "Chance"
];

const YahtzeeScoreSheet = () => {
  const [scores, setScores] = useState({
    Ones: null,
    Twos: null,
    Threes: null,
    Fours: null,
    Fives: null,
    Sixes: null,
    'Three of a Kind': null,
    'Four of a Kind': null,
    'Full House': null,
    'Small Straight': null,
    'Large Straight': null,
    Yahtzee: null,
    Chance: null
  });
  const [totalScore, setTotalScore] = useState(0);
  const [bonusEarned, setBonusEarned] = useState(false);

  const [rollDiceVisible, setRollDiceVisible] = useState(false);

  const handleRollDice = () => {
    setRollDiceVisible(true);
  };

  const handleRollDiceClose = () => {
    setRollDiceVisible(false);
  };

  const handleInput = (category, value) => {
    const score = parseInt(value);
    const maxScore = getMaxScore(category);
    if (score > maxScore) {

      Alert.alert(`Number is too high for selected column`);

      return;
    }
    setScores(prevState => ({
      ...prevState,
      [category]: score
    }));

    let newTotalScore = totalScore;
    if (score) {
      newTotalScore += score;
    }
    if (newTotalScore >= 63 && !bonusEarned) {
      newTotalScore += 35;
      setBonusEarned(true);
      setTotalScore(newTotalScore);
    } else if (newTotalScore < 63 && bonusEarned) {
      newTotalScore -= 35;
      setBonusEarned(false);
      setTotalScore(newTotalScore);
    }
    if (newTotalScore < 0) {
      newTotalScore = 0;
    }
  };
  const getMaxScore = (category) => {
    switch (category) {
      case "Ones":
        return 5;
      case "Twos":
        return 10;
      case "Threes":
        return 15;
      case "Fours":
        return 20;
      case "Fives":
        return 25;
      case "Sixes":
        return 30;
      case "Three of a Kind":
      case "Four of a Kind":
      case "Chance":
        return 30;
      case "Full House":
        return 25;
      case "Small Straight":
        return 30;
      case "Large Straight":
        return 40;
      case "Yahtzee":
        return 50;
      default:
        return 0;
    }
  };








  const calculateTotal = () => {
    let bonus = bonusEarned ? 35 : 0;
    let total = Object.values(scores).reduce((acc, curr) => {
      if (curr) {
        return acc + curr;
      }
      return acc;
    }, 0);
    if (total >= 63) {
      if (!bonusEarned) {
        bonus = 35;
        setBonusEarned(true);
      }
    } else {
      if (bonusEarned) {
        bonus = -35;
        setBonusEarned(false);
      }
    }
    return total + bonus;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item}</Text>
        <TextInput
          onChangeText={(value) => {
            handleInput(item, value);
            setTotalScore(calculateTotal());
          }}
          keyboardType="numeric"
          style={styles.cell}
          value={scores[item] ? scores[item].toString() : ''}
          maxLength={3}
        />
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={style.headerText}>Yahtzee sheet</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <View style={styles.row}>
        <Text style={[styles.cell, styles.total]}>Total Score:</Text>
        <Text style={[styles.cell, styles.total]}>{calculateTotal()}</Text>
      </View>
      <TouchableOpacity style={style.rollButton} onPress={handleRollDice}>
        <FontAwesome5 name="dice" size={24} color="white" />
        <Text style={style.gameText}>Roll Dice</Text>
      </TouchableOpacity>
      <RollDicePopup visible={rollDiceVisible} onClose={handleRollDiceClose} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#4E9BB0',
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#F9BB00',
    fontFamily:'timeburner'
  },
  total: {
    backgroundColor: '#edba21',
    fontFamily:'timeburnerBold',
  },diceContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  rollButton: {
    marginTop: 50,
  },
});

export default YahtzeeScoreSheet;
