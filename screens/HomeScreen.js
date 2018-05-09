import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl
} from 'react-native';
import { Font, AppLoading } from "expo";
import { Container, Header, Content, Form, Item, Input, Icon, Button, Text, InputGroup, Left, Right, Body, Title } from 'native-base';
import fetchapi from '../api/fetchapi';


export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomeScreen',
    header: {visible:'false'},
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
/*   async componentDidMount() {
    const coins = await fetchapi.fetch10();
    this.setState({coins});
  } */
  async componentDidMount() {
    const coiner = await fetchapi.fetch10v2();
    this.setState({coiner});
  //  console.log(coiner)
  }
  state = {
    refreshing: false,
    coiner: [] 
    
  }
 
//var array = Object.keys(coiner).map(item => coiner[item]);

  refreshDataFromServer = () => {
        this.setState({ refreshing: true });
        fetchapi().then((fetch10) => {
        this.setState({ refreshing: false });
    }).catch((error) => {
        this.setState({ foodsFromServer: [] });
        this.setState({ refreshing: false });
    });
}
  onRefresh = () => {
    this.refreshDataFromServer();
  }



  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
   
    return (
      <Container>
        <Content>
        
          
              <Header/>
          
              <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={styles.h2text}>
                TOP 10
                </Text>
              
                <FlatList
                    data={this.state.coiner}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>

                      <View style={styles.flatview}>
                        <Text style={styles.name}>Tên Coin: {item.name}</Text>
                        <Text style={styles.gia}>Giá: {item.quotes.USD.price} $</Text>
                      </View>

                    }
                    keyExtractor={item => item.name}
                  
                  
                />
              

          </View>
        </Content>
      </Container>      
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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