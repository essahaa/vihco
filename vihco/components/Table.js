import { View, Text, ScrollView } from "react-native";
import styles from "../styles/style";

export default Table = (data) => {

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.tableCellHeader, styles.tableCellName]}>
                    <Text style={styles.text}>Name</Text>
                </View>{ /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
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
            <ScrollView style={styles.scrollview}>
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
                            <Text style={styles.text}>{(data.data[i].win / data.data[i].loss).toFixed(2)}</Text>
                        </View>
                    </View>
                ))
            }</ScrollView>
        </View>
    );

}