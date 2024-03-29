import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { View } from 'react-native';
import Bottomtab from './components/Bottomtab';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Game from './components/Game';
import { useFonts } from 'expo-font';
import styles from './styles/style';
import Group from './components/Group';
import GameSettings from './components/GameSettings';
import GroupShared from './components/GroupShared';
import { LogBox } from 'react-native';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

//LogBox.ignoreAllLogs();

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
            <Stack.Screen
              name="GameSettings"
              component={GameSettings}
              options={{
                  animationEnabled: false
              }}/>
          <Stack.Screen
          name="Group"
          component={Group}
          options={{
              animationEnabled: false
          }}/>
          <Stack.Screen
          name="GroupShared"
          component={GroupShared}
          options={{
              animationEnabled: false
          }}/>
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}