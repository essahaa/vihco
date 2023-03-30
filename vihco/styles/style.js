import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    appContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#4E9BB0'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#112126'
    },
    logo: {
        width: 200,
        height: 200
    },
    text: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 16,
    },
    textInput: {
        backgroundColor: 'white',
        width: 250,
        height: 45,
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 15,
        color: 'black',
        fontFamily: 'timeburner'
    },
    buttonText: {
        color: '#112126',
        fontFamily: 'timeburnerBold',
        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    buttonPrimary: {
        backgroundColor: '#F9BB00',
        marginTop: 25,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15
    },
    buttonSecondary: {
        backgroundColor: '#F9BB00',
        marginTop: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 15
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center'
    },
    forgotPass: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        paddingHorizontal: 30,
        paddingVertical: 10
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