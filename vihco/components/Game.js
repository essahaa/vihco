import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/style';

export default Game = ({route}) => {
    const [gameName, setGameName] = useState('');

    useEffect(() => {
        if( gameName === '' && route.params?.game ) {
            setGameName(route.params.game);
        }
    }, []);
    
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{gameName}</Text>
      </View>
    );
  }