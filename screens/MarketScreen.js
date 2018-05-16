import React, { Component } from 'react';
import {
  Text, View, Dimensions,StyleSheet,ImageBackground,StatusBar
} from 'react-native';
import { Font, AppLoading } from "expo";
import {Card, Header, CardItem, Container, Content, Form, Item, Icon,
        InputGroup, Left, Right, Body, Title, List,ListItem, Input, Button, Picker
      } from 'native-base';
//import {Header, List, ListItem, SearchBar } from "react-native-elements";
import api from '../api/api';

class MarketScreen extends Component {
  
    static navigationOptions = {
        header: null,
        title: 'MarketScreen',
        
        };
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            selected1: ""
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
    onValueChange(value: string) {
      this.setState({
        selected1: value
      });
    }
  
  render() {
   // let {height, width} = Dimensions.get('window');
   // console.log("data coin :",this.state.data);
    //  console.log("data coin :",this.state.bitcoin);

    const info = this.state.data;
    
    function* values(info) {
        for (let prop of Object.keys(info)) // own properties, you might use
                                           // for (let prop in obj)
            yield info[prop];
    }
    let arr = Array.from(values(info));


  //  console.log(arr[0])
    

      return (
    
        <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../img/coinblue.png')}>
                 <StatusBar
                 backgroundColor="red"
                 barStyle="light-content"
               />
        <Container>
        <Header style={{ marginTop:24}} searchBar>
            <Item>
                <Icon onPress={() => alert('This is a button Seach')} name="md-search" />
                <Input placeholder="Search" />
                <Icon name="logo-usd" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
        </Header>
        <Content>
          
          <View style={{flexDirection: 'row',borderBottomWidth: 2,borderBottomColor: 'white',height:40}}>
            <Text style={{marginLeft:10, color:'white',fontSize:20}}>Name / Market Cap</Text>
          
            <Text style={{marginLeft:100,color:'white',fontSize:20}}>Price</Text> 
           

          </View>
          <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{color:'white'}}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)} >
              <Picker.Item label="Price ⬆️" value="key0" />
              <Picker.Item label="Price ⬇️" value="key1" />
            </Picker>
            
          <List dataArray={arr}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <View>
                    <Text style={{color: (item.quotes.USD.percent_change_24h >= 0) ?  'green' : 'white',fontSize:15}}>
                      {item.name} ({item.symbol})
                    </Text>
                    <Text style={{color: (item.quotes.USD.percent_change_24h >= 0) ?  'green' : 'white'}}>
                      {item.quotes.USD.market_cap}$
                    </Text>
                   
                  </View>
                </Body>

                <Right style={{flexDirection:'row',justifyContent:'flex-end'}}>

                  <Icon name= {(item.quotes.USD.percent_change_24h >= 0) ? 'arrow-up' : 'arrow-down' }
                    style={{color: (item.quotes.USD.percent_change_24h >= 0) ?  'green' : 'red'}} />

                  <Text style={{color: (item.quotes.USD.percent_change_24h >= 0) ?  'green' : 'red'}}>
                    {item.quotes.USD.price} $
                  </Text>

                  
                </Right>
              </ListItem>
            }>
          </List>
         
        </Content>
      </Container>
      </ImageBackground>
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
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
},
    
  });

  export default MarketScreen; 