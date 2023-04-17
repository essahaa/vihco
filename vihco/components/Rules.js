import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import styles from '../styles/style';
import Header from './Header2';
import Table from './Table';


const Rules = ({navigation, route}) => {
    const gameName = route.params?.gameName;
  // Define game rules for Yatzi
  let gameRules = {};
  let screenName = "";
  switch (gameName) {
    case 'Yatzi':
      gameRules = {
        title: "Yatzi",
        rules: [
          "THE GAME: Upper section of the classic Yahtzee " +
          "dice game. You have 5 dices and " +
          "for the every dice you have 3 " +
          "throws. After each throw you can keep dices in " +
          "order to get same dice spot counts as many as " +
          "possible. In the end of the turn you must select " +
          "your points from 1 to 6. " +
          "Game ends when all points have been selected. " +
          "The order for selecting those is free. " +
          "POINTS: After each turn game calculates the sum " +
          "for the dices you selected. Only the dices having " +
          "the same spot count are calculated. Inside the " +
          "game you can not select same points from " +
          "1 to 6 again."
        ]
      };
      screenName = "Yatzi";
      break;
    case 'SevenOfClubs': 
    gameRules = { 
    title: "Seven of clubs", 
    rules: [
        "Number of Players: The game is typically played with 3-6 players.",
        "Objective: The objective of the game is to get rid of the cards dealt for you.",
        "Gameplay:",
        "The player who has the seven of clubs starts the game by laying it on the table.",
        "Each player must must play a card on their turn, if they don't have a suitable card, they have to take a card from the player who had the last turn.",
        "Each suit starts on the table when a 7 is played. After the 7, a 6 must be played before 8 and after that, there is no limitations on the table, other than that the cards must be played in order.",
        "For example on top of 8 of hearts, players have to play 9, 10, J , Q ,K of hearts, in that order. And on top of 6, 5,4,3,2 and A of hearts in that order.",
        "The game continues in this way until all of the cards have been played.",
        "After a player plays a final card on top of a pile(A or K) they can play another card after it they want.",
        "The first player to get rid of all of their cards win, and the player who plays the last card loses."
      ]
      };
      screenName = "Sheets";
    break;
  case 'Cluedo' :
    gameRules = { 
    title: "Cluedo", 
    rules: [
        "Number of Players: 3-6 players.",
        "Objective: Determine the murderer, location, and weapon of a murder.",
        "Gameplay:",
        "Players move around the board to collect clues and eliminate possibilities.",
        "Each player is dealt a set of cards representing the murderer, location, and weapon. One card of each set is placed in a secret envelope, which represents the actual solution to the murder.",
        "Players take turns making suggestions of the murderer, location, and weapon, based on their current location on the board and the cards they hold.",
        "The player to the left of the suggester must show any one of the suggested cards to the suggester, if they have any of them in their hand. If the suggester has all three cards in their hand, they secretly mark them on their detective notes and the game ends.",
        "If the suggestion cannot be refuted by any player, the suggester can then make an accusation. If the accusation is correct, they win the game. If the accusation is incorrect, they are out of the game.",
        "The game continues until one player has correctly accused the murderer, location, and weapon, or until all players have made incorrect accusations and are out of the game."
      ]
  };
  screenName = "Cluedo";
    break;
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
    <ScrollView>
 <View style={[styles.container, {height: '100%', backgroundColor: 'black'}]}>
  <View style={styles.gameTopBar}>
    <Header />
  </View>
  <View style={{flexDirection: 'row'}}>
    <View style={[styles.flexLeft, {paddingLeft: 35, alignItems: 'center', justifyContent: 'center'}]}>
      <Text style={[styles.text, {textAlign: 'center'}]}>Rules of {gameRules.title} </Text>
      {gameRules.rules.map(rule => (
        <Text key={rule} style={[styles.text]}>
          {rule}
        </Text>
      ))}
      <Pressable style={styles.buttonPrimary} onPress={() => navigation.navigate(screenName)}>
        <Text style={styles.button}>Play now!</Text>
      </Pressable>
    </View>
  </View>
</View>
</ScrollView>
</SafeAreaView>
  );
}

export default Rules;
