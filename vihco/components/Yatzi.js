import { useState, } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import style from '../styles/style';
export default function Yatzi({navigation}) {
  
const [endScore, setEndScore]=useState(0)

  function addScore() {
  setEndScore(endScore+2)
  return endScore
}

  return (
    <View style={styles.yatzi}>
      <Text >yatzi</Text>
      <Text>testi</Text>
     
     <Pressable style={style.gameButton} onPress={addScore}><Text style={style.buttonText}>Add 1</Text></Pressable>
      <Text >End score: {endScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yatzi:{
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: "auto"
  },
})