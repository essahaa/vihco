import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    appContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#112126'
    },
    text: {
        color: 'white',
        fontFamily: 'timeburner'
    },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        
    }
});