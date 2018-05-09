import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Font, AppLoading } from "expo";
import {Card, CardItem, Container, Content, Form, Item, Input, Icon, Button, Text, InputGroup, Left, Right, Body, Title } from 'native-base';
import {Header, List, ListItem, SearchBar } from "react-native-elements";
import api from '../api/api';

export default class MarketScreen extends Component {
    static navigationOptions = {
        header: null,
        title: 'MarketScreen',
        };
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: true,
            
        }
    }
    componentWillMount(){
        api.getDataCoin10().then((res) => {
            this.setState({
                isLoading: false,
                data: res.data,
                bitcoin: res.data[1].name
            },function(){
                

            });
        
        }).catch((error) =>{
            console.error(error);
        })
    }
  
  render() {
   // console.log("data coin :",this.state.data);
    //  console.log("data coin :",this.state.bitcoin);

    const info = this.state.data;
    
    function* values(info) {
        for (let prop of Object.keys(info)) // own properties, you might use
                                           // for (let prop in obj)
            yield info[prop];
    }
    let arr = Array.from(values(info));


    console.log(arr[0])
      return (
        <View style={{ flex: 1, backgroundColor:'blue' }}>
           <Header
              placement="left"
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Martket', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <View style={{flex:1}}><Text>TOP 10</Text></View>
            <List containerStyle={{ borderTopWidth: 1, borderBottomWidth: 1 }}>

                <FlatList
                    data={arr}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>

                      <ListItem
                      title={`${item.name} (${item.symbol})`}
                      subtitle={item.quotes.USD.market_cap}
                      rightTitle= {`US$ ${item.quotes.USD.price}`}
                      //neu changer 24 h < 0 = red , con lai green.
                     
                      rightTitleStyle={{
                      color: (item.quotes.USD.percent_change_24h >= 0) ?  'green' : 'red'
                      }}
                      
                      rightSubtitle ={`${item.quotes.USD.percent_change_24h}`}
                  
                      />
                     

                    }
                    keyExtractor={(item) => {return item.name.toString()}}
                />
           </List>
           </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontSize: 36,
      fontWeight: 'bold',
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    name: {
      fontSize: 18
    },
    email: {
      color: 'red'
    }
    
  });