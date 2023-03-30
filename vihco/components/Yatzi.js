import { StyleSheet, Text, View } from 'react-native';


export default function Yatzi({navigation}) {
  return (
    <View >
      <Text >yatzi</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  yatzi:{
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
  }
})