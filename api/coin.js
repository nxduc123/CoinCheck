import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const apiGetAllCoins = 'https://api.coinmarketcap.com/v2/ticker/?limit=10'

async function GetAllCoins(){
    try {
        let response = await fetch(apiGetAllCoins);
        let responseJson = await response.json();
        return responseJson.data;
    } catch(error){
        console.error(`Eror is: ${error}`);
    }
}
export {GetAllCoins};





/* 
export default class HomeScreen extends React.Component {


  render() {
    return (
      <View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',}}><Text>Hello COin</Text></View>
    );
  }
 */