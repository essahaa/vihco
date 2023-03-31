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
        paddingBottom: 10,
        backgroundColor: '#4E9BB0'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#112126'
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 20
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
        marginVertical: 10,
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
    gameText: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: 'white',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    addGameText: {
        color: '#4E9BB0',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: '#4E9BB0',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    gameButton: {
        backgroundColor: '#4E9BB0',
        width: 325,
        height: 70,
        marginVertical: 8,
        paddingHorizontal: 20,
        paddingTop: 10,
        borderRadius: 10
    },
    addGameButton: {
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#4E9BB0',
        width: 325,
        height: 70,
        marginVertical: 8,
        paddingHorizontal: 20,
        //paddingRight: 30,
        borderRadius: 10,
        borderStyle: 'dashed'
    },
    addGameInput: {
        fontSize: 20,
        fontFamily: 'timeburnerBold',
        width: 225,
        height: 40,
    },
    buttonTextSettings: {
        color: '#112126',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    buttonTextLogout: {
        color: '#F9BB00',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: '#F9BB00',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1
    },
    buttonPrimary: {
        backgroundColor: '#F9BB00',
        marginTop: 8,
        paddingVertical: 10,
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
    buttonSettings: {
        backgroundColor: '#F9BB00',
        marginTop: 5,
        paddingVertical: 12,
        width: 250,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttonLogout: {
        borderWidth: 4,
        borderColor: '#F9BB00',
        marginTop: 5,
        paddingVertical: 12,
        width: 250,
        borderRadius: 15,
        alignItems: 'center'
    },
    flexCenter: {
        flex: 1,
        justifyContent: 'center'
    },
    flexBottom: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    flexRight: {
        flex: 1,
        alignItems: 'flex-end'
    },
    forgotPass: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    listTop: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 50,
        width: '100%'
    },
    title: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: 'white',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
    }
    /* title: {
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
    } */
});