import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import Bottomtab from './components/Bottomtab';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
//import Games from './Games';
import Game from './components/Game';
import { useFonts } from 'expo-font';
import styles from './styles/style';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

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
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName='Bottomtab'
          screenOptions={{headerShown: false}}
      >
          <Stack.Screen 
              name="Bottomtab"
              component={Bottomtab}
              options={{
                  animationEnabled: false
              }}/>
          <Stack.Screen
              name="Game"
              component={Game}
              options={{
                  animationEnabled: false
              }}/>
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}