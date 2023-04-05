import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Account from './Profile';
import Sheets from './Sheets';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import Login from './Login';
import Register from './Register';
import Yatzi from './Yatzi';
import Settings from './Settings';
import Games from './Games';
import Groups from './Groups';

const Tab = createBottomTabNavigator();

export default Bottomtab = () => {
  return (
    <Tab.Navigator
       initialRouteName='Login'
      screenOptions={{headerShown: false}}
    >
      <Tab.Screen name="Home"  component={Home} options={{ tabBarIcon:()=> <MaterialCommunityIcons name="book-open-variant" size={24} color="black" />}}/>
      <Tab.Screen name="Games"  component={Games} options={{tabBarIcon:()=> <MaterialCommunityIcons name="cards-playing" size={24} color="black" />}}/>
      <Tab.Screen name="Sheets"  component={Sheets} options={{tabBarIcon:()=> <MaterialCommunityIcons name="file-document-multiple-outline" size={24} color="black" />}}/>
      <Tab.Screen name="Account"  component={Account} options={{tabBarIcon:()=> <MaterialIcons name="account-circle" size={24} color="black" />}}/>
      <Tab.Screen name="Login"  component={Login} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Register"  component={Register} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Yatzi"  component={Yatzi} options={{tabBarIcon:()=> <MaterialIcons name="account-circle" size={24} color="black" />}}/>
      <Tab.Screen name="Settings"  component={Settings} options={{tabBarIcon:()=> <MaterialIcons name="account-circle" size={24} color="black" />}}/>
      <Tab.Screen name="Groups"  component={Groups} options={{tabBarIcon:()=> <MaterialIcons name="account-circle" size={24} color="black" />}}/>
    </Tab.Navigator>
  );
}