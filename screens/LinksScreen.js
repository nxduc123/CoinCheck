import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet,TouchableOpacity, FlatList  } from 'react-native';

export default class Office extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount() {
      return fetch('https://api.coinmarketcap.com/v2/ticker/?limit=1')
        .then((response) => response.json())
        .then((responseJson) => {
         // just setState here e.g.
         this.setState({ dataSource: responseJson.data,isLoading: false });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.dataSource)
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =><Text>{item.name}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
container: {
    flex:1,
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'center',
},
touchButton:{
    alignSelf:'center',
    backgroundColor:'#2980b9',
  paddingVertical: 25,
    width:295,
    margin:15,
},
touchButtonText:{
  textAlign:'center',
  color:'#ffffff',
  fontWeight:'bold'
},

})