import { Image } from 'react-native';
import styles from '../styles/style';

export default function Logo() {

    return(
        <Image
            style={styles.logo}
            source={require('../assets/images/logooo_vihrea.png')}
        />
    );
};

