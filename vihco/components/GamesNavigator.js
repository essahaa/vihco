import { createStackNavigator } from '@react-navigation/stack';
import Games from './Games';
import Game from './Game';

const Stack = createStackNavigator();

export default GamesNavigator = () => {

    return(
        <Stack.Navigator
            initialRouteName='Games'
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen 
                name="Games"
                component={Games}
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
    );
}