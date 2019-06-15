/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, TextInput, SafeAreaView,Image} from 'react-native';
import { Button, Text, Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right  } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      city: '',
      isLoading:'false',
      hideImage:true,
      img:"",
      minTemp:"",
      maxTemp:"",
      aggTemp:"",
      windSpeed:"",
      airPressure:"",
      visibility:"",
      errMsg:""
    };
  }

  getWeather(){
    this.setState({
      isLoading:true
    })
    fetch('https://www.metaweather.com/api/location/search/?query='+this.state.city)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.length==1){
        let cityId=responseJson[0].woeid;
        fetch('https://www.metaweather.com/api/location/'+cityId)
        .then((response1) => response1.json())
        .then((responseJson1) => {
          if(responseJson1.consolidated_weather.length>0){
            weatherObj=responseJson1.consolidated_weather[0]
            this.setState({
              img:weatherObj.weather_state_abbr,
              hideImage:false,
              minTemp:parseFloat(weatherObj.min_temp).toFixed(2),
              maxTemp:parseFloat(weatherObj.max_temp).toFixed(2),
              aggTemp:parseFloat(weatherObj.the_temp).toFixed(2),
              windSpeed:parseFloat(weatherObj.wind_speed).toFixed(2),
              airPressure:parseFloat(weatherObj.air_pressure).toFixed(2),
              visibility:parseFloat(weatherObj.visibility).toFixed(2)
            })
          }
        })
        .catch((error) =>{
          console.error(error);
        });
      }
      else{
        this.setState({
          errMsg:"This Data is not available"
        })
      }
     

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  render() {
    return (
      <Container style={{padding:10}}>
      <Header >
        <Text>Weather forecast</Text>
      </Header>
      <Content>
      <Card>
            <CardItem style={{width:"100%",flex:1}}>
              <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1,padding:2,flex:3}}
          onChangeText={(text) => this.setState({city:text})}
          value={this.state.text}
          placeholder={" Enter City Name"}
        />
              <Button onPress={()=>this.getWeather()} light><Text> Get Weather </Text></Button>
        
            </CardItem>
            </Card>
       
        
        <View style={[styles.container,{display:this.state.hideImage?"none":"flex"}]}>
        <Card>
            <CardItem style={{width:"100%"}}>
              <Left>
                <Body>
                  <Text style={{fontSize:26,fontWeight:"500"}}>{this.state.aggTemp}℃</Text>
                  <Text style={{fontSize:14,color:"#00000077"}}>Average Temperature</Text>
                </Body>
              </Left>
              <Right>
                <Image
                  style={{width: 150, height: 150}}
                  source={{uri: "https://www.metaweather.com/static/img/weather/png/"+this.state.img+".png"}}
                  />
              </Right>
            </CardItem>
            <CardItem style={{width:"100%",marginTop:10}}>
              <Left>
                <Body>
                  <Text style={{fontSize:20,fontWeight:"500"}}>{this.state.minTemp}℃</Text>
                  <Text style={{fontSize:14,color:"#00000077"}}>Min Temperature</Text>
                </Body>
              </Left>
              <Right>
              <Body>
                  <Text style={{fontSize:20,fontWeight:"500"}}>{this.state.maxTemp}℃</Text>
                  <Text style={{fontSize:14,color:"#00000077"}}>Max Temperature</Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem style={{width:"100%",marginTop:20,borderTopColor:"#000",borderWidth:1}}>
              <Left>
                <Body style={{borderWidth:0.2,padding:5}} >
                <Text style={{fontSize:18,fontWeight:"500"}}>{this.state.windSpeed} km/h</Text>
                <Text style={{fontSize:14,color:"#00000077"}}>Wind Speed</Text>
                </Body>
              </Left>
              <Body style={{borderWidth:0.2,padding:5}}>
              <Text style={{fontSize:18,fontWeight:"500"}}>{this.state.airPressure} mb</Text>
              <Text style={{fontSize:14,color:"#00000077"}}>Air Pressure</Text>
               </Body>
              <Right style={{borderWidth:0.2,padding:5}}>
              <Text style={{fontSize:18,fontWeight:"500"}}>{this.state.visibility}</Text>
              <Text style={{fontSize:14,color:"#00000077"}}>Visibility</Text>
              </Right>
            </CardItem>
          </Card>
            
        </View>
      </Content>
    </Container>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
