import { View, Text, ScrollView } from "react-native";
import styles from "../styles/style";
import { FontAwesome5 } from '@expo/vector-icons'; 
import style from "../styles/style";

export default Table = (data) => {

    const getRatio = (wins, losses) => {
        const ratio = (wins/losses).toFixed(2);
        if(isNaN(ratio)) {
            return 0;
        }else if(losses === 0) {
            return wins;
        }else return ratio;
    }

    const getIcon = (position) => {
        switch(position) {
            case 1:
                return <FontAwesome5 name="crown" size={15} color="gold" />;
            case 2:
                return <FontAwesome5 name="crown" size={15} color="silver" />;
            case 3:
                return <FontAwesome5 name="crown" size={15} color="brown" />;
            default:
                return <Text style={styles.text}>{position}. </Text>
        }
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
                {data.data.sort((a, b) => b.win - a.win).map((key, i) => (
                    <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[styles.tableCell, styles.tableCellName,{flexDirection:'row',justifyContent:'flex-start'}]}>
                            {getIcon(i + 1)}
                            <Text style={styles.text}>   {data.data[i].name}</Text>
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
                }
            </ScrollView>
        </View>
    );

}
