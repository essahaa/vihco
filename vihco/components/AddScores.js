import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from "../firebase/Config";
import styles from "../styles/style";
import { Button } from "react-native-elements";

export default AddScores = (id, userData) => {

/*     function increase(userId, field) {
        const increment = firebase.firestore.FieldValue.increment(1);

        const user = db.collection("/games/" + id + "/users").doc(userId);

        user.update({ field: increment });
    } */

    return (
            <View style={styles.table}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.tableBottomBorder, styles.tableCellName]}>
                    <Text style={styles.text}>Name</Text>
                </View>
                <View style={styles.tableBottomBorder}>
                    <Text style={styles.text}>W</Text>
                </View>
                <View style={styles.tableBottomBorder}>
                    <Text style={styles.text}>L</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollview}>
                <Button onPress={() => console.log("userdata: " + userData.name)} title="press"/>
                {/* {userData.data.map((key, i) => (
                <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={[styles.tableBottomBorder, styles.tableCellName]}>
                        <Text style={[styles.text, {fontSize: 20}]}>{userData.data[i].name}</Text>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        <Pressable style={styles.plusButton} onPress={() => increase(userData.data[i].id, "win")}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        <Pressable style={styles.minusButton}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                    <View style={[styles.tableBottomBorder, {flexDirection: 'row'}]}>
                        <Pressable style={styles.plusButton}>
                            <MaterialCommunityIcons name="plus-thick" size={30} color={'white'}/>
                        </Pressable>
                        <Pressable style={styles.minusButton}>
                            <MaterialCommunityIcons name="minus-thick" size={20} color={'white'}/>
                        </Pressable>
                    </View>
                </View>
                ))} */}
            </ScrollView>
            {/* <ScrollView style={styles.scrollview}>
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
            }</ScrollView> */}
        </View>
        </View>
    )
}