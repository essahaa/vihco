import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styles from '../styles/style';

const LoadingScreen = () => {
  return (
    <View style={{  alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#4e9bb0" />
      <View style={{flexDirection:'row'}}>
      <Text style={styles.text}>Loading</Text><Text style={[styles.text,{color:'#F9BB00'}]}> Vihco</Text>
      </View>
    </View>
  );
}

export default LoadingScreen;
