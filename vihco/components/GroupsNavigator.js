import { createStackNavigator } from '@react-navigation/stack';
import Group from './Group';
import Groups from './Groups';

const Stack = createStackNavigator();

export default GroupsNavigator = () => {

    return(
        <Stack.Navigator
            initialRouteName='Groups'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen 
                name="Groups"
                component={Groups}
                options={{
                    animationEnabled: false
                }}/>
            <Stack.Screen
                name="Group"
                component={Group}
                options={{
                    animationEnabled: false
                }}/>
        </Stack.Navigator>
    );
}