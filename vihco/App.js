import * as SplashScreen from 'expo-splash-screen';
import { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import Bottomtab from './components/Bottomtab';
import { useFonts } from 'expo-font';
import styles from './styles/style';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'timeburner': require('./assets/fonts/timeburner/timeburnernormal.ttf'),
    'timeburnerBold': require('./assets/fonts/timeburner/timeburnerbold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.appContainer} onLayout={onLayoutRootView}>
      <Bottomtab />
    </View>
  );
}