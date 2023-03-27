import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Home from './Home';

const Tab = createBottomTabNavigator();

export default Bottomtab = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home"  component={Home}/>
      
    </Tab.Navigator>
    </NavigationContainer>
  );
}