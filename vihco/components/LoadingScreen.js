import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styles from '../styles/style';
const LoadingScreen = () => {
  return (
    <View style={{  alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#4e9bb0" />
      <Text style={styles.text}>Loading epic gamer moments...</Text>
    </View>
  );
}

export default LoadingScreen;
