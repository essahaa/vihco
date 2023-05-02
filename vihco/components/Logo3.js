import { Image } from 'react-native';
import styles from '../styles/style';

export default function Logo() {

    return(
        <Image
            style={[styles.logo, {marginTop: 10}]}
            source={require('../assets/images/logo_etu_vihrea.png')}
        />
    );
};
