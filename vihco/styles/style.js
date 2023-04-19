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
    gameHeader: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 24,
        textShadowColor: 'white',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
        marginLeft: 10,
        marginBottom: 5
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
    buttonScores: {
        backgroundColor: '#F9BB00',
        marginVertical: 40,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 15
    },
        dropdown: {
            fontFamily: 'timeburnerBold',
        alignSelf: 'center',
        backgroundColor: '#F9BB00',
        marginTop: 5,
        marginBottom: 0,
        paddingVertical: 1,
        width: 250,
        borderRadius: 15,
        alignItems: 'center',
        borderColor: '#f9bb00',
        fontFamily: 'timeburnerBold',
    },
    dropdown1: {
            
        alignSelf: 'center',
        backgroundColor: '#F9BB00',
        
        
        
        width: 200,
        
        alignItems: 'center',
        
        fontFamily: 'timeburnerBold',
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
    flexLeft: {
        flex: 1,
        alignItems: 'flex-start'
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
        marginBottom: 25,
        width: '100%'
    },
    title: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: 'white',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
    },
    scrollview: {
        width: 350,
        alignItems: 'center'
    },
    gameTopBar: {
        backgroundColor: '#4E9BB0',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%'
    },
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
   
      headerText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'timeburnerBold',
      },
      headerIcon: {
        color: 'white',
        fontSize: 24,
      },
      flexHeaderRigth: {
        alignItems: 'flex-end'
      },
      flexHeaderCenter: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    },
    table: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        width: 350,
        flexDirection: 'row',
        marginBottom: 50
    },
    tableCell: {
        backgroundColor: '#326472',
        flex: 1,
        justifyContent: 'center',
        margin: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7,
        height: 40
    },
    tableCellHeader: {
        backgroundColor: '#4E9BB0',
        flex: 1,
        justifyContent: 'center',
        margin: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    tableCellName: {
        alignItems: 'flex-start',
        flex: 0,
        width: 150
    },
    tableBottomBorder: {
        borderBottomColor: '#326472',
        borderBottomWidth: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    plusButton: {
        backgroundColor: '#4E9BB0',
        borderRadius: 100,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    minusButton: {
        backgroundColor: '#326472',
        borderRadius: 100,
        padding: 7,
        marginLeft: 5
    },
    scoreNum: {
        color: 'white',
        fontFamily: 'timeburnerBold',
        fontSize: 20,
        textShadowColor: 'white',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
    },
    loggingLoading: {
        borderWidth: 4,
        borderColor: '#F9BB00',
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 25,
        fontSize: 20,
        justifyContent: 'center',
        color: '#F9BB00',
        textShadowColor: '#F9BB00',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 1,
        fontFamily: 'timeburnerBold',
    }
});