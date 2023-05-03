import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Sheets from './Sheets';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import Login from './Login';
import Register from './Register';
import Yatzi from './Yatzi';
import Settings from './Settings';
import Games from './Games';
import Groups from './Groups';
import Cluedo from './Cluedo'
import Profile from './Profile';
import Rules from './Rules';
import EditProfile from './EditProfile';
import ForgotPassword from './ForgotPassword';
import ProfileGameStats from './ProfileGameStats';
import style from '../styles/style';

const Tab = createBottomTabNavigator();

export default Bottomtab = () => {
  return (
    <Tab.Navigator
       initialRouteName='Home'
      screenOptions={{headerShown: false, tabBarActiveBackgroundColor: '#4e9bb0', tabBarInactiveBackgroundColor: '#326472', tabBarStyle:{borderTopWidth:0}, tabBarInactiveTintColor: '#ffffff', tabBarActiveTintColor: '#ffffff'}}
    >
      <Tab.Screen name="Home"  component={Home} options={{ tabBarIcon:()=> <Ionicons name="home" size={21} color="white" />}}/>
      <Tab.Screen name="Groups"  component={Groups} options={{tabBarIcon:()=> <MaterialCommunityIcons name="account-group" size={24} color="white" />}}/>
      <Tab.Screen name="Games"  component={Games} options={{tabBarIcon:()=> <MaterialCommunityIcons name="cards-playing" size={24} color="white" />}}/>
      <Tab.Screen name="Sheets"  component={Sheets} options={{tabBarIcon:()=> <MaterialIcons name="article" size={23} color="white" />}}/>
      <Tab.Screen name="Profile"  component={Profile} options={{tabBarIcon:()=> <MaterialIcons name="account-circle" size={24} color="white" />}}/>
      <Tab.Screen name="Login"  component={Login} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Register"  component={Register} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Yatzi"  component={Yatzi} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Settings"  component={Settings} options={{tabBarIcon:() => null, tabBarButton: () => null}}/>
      <Tab.Screen name="Cluedo"  component={Cluedo} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="Rules"  component={Rules} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="EditProfile"  component={EditProfile} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="ForgotPassword"  component={ForgotPassword} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>
      <Tab.Screen name="ProfileGameStats"  component={ProfileGameStats} options={{tabBarStyle: {display: "none"}, tabBarButton: () => null}}/>

    </Tab.Navigator>
  );
}