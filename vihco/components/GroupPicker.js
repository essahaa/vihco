import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import style from '../styles/style';

const GroupPicker = ({ groups, onSelect }) => {
    const [value, setValue] = useState('');

    const handleValueChange = (itemValue) => {
        setValue(itemValue);
        onSelect(itemValue);
    };

    return (
        <View>
            <Text
                style={style.buttonTextSettings}>SELECT GROUP</Text>
            {groups && groups.length > 0 ? (
                <Picker
                    selectedValue={value}
                    onValueChange={handleValueChange}
                    style={{ fontFamily: 'timeburnerBold', fontSize: 16 }}
                    itemStyle={{ fontFamily: 'timeburnerBold', fontSize: 15 }}
                >
                    {groups.map(group => (
                        <Picker.Item 
                        key={group.value} 
                        label={group.label} 
                        value={group.value} />
                    ))}
                </Picker>
            ) : (
                <Text>No groups available.</Text>
            )}
        </View>
    );
};

export default GroupPicker;
