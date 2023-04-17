import { View, Text, ScrollView } from "react-native";
import styles from "../styles/style";

export default Table = (data) => {

    const getRatio = (wins, losses) => {
        const ratio = (wins/losses).toFixed(2);
        if(isNaN(ratio)) {
            return 0;
        }else if(losses === 0) {
            return wins;
        }else return ratio;
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.tableCellHeader, styles.tableCellName]}>
                    <Text style={styles.text}>Name</Text>
                </View>
                <View style={styles.tableCellHeader}>
                    <Text style={styles.text}>W</Text>
                </View>
                <View style={styles.tableCellHeader}>
                    <Text style={styles.text}>L</Text>
                </View>
                <View style={styles.tableCellHeader}>
                    <Text style={styles.text}>W/L</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollview}>
            {data.data.map((key, i) => (
                    <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[styles.tableCell, styles.tableCellName]}>
                            <Text style={styles.text}>{data.data[i].name}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>{data.data[i].win}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>{data.data[i].loss}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text style={styles.text}>{getRatio(data.data[i].win, data.data[i].loss)}</Text>
                        </View>
                    </View>
                ))
            }</ScrollView>
        </View>
    );

}