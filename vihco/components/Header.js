import { Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

export default Header = () => {
    return (
        <View >
            <MaterialCommunityIcons name="cog" size={24} color="black" />
        <Text>header</Text>
      </View>
    );
}