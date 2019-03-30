import React from 'react';
import {StyleSheet,View, TextInput, TouchableOpacity, Text, Image} from 'react-native';
import Loading from "./Loading";

export default class AppWeatherAsync1715051131 extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    city: '',
    forecast: {
      temp: 0,
      speed: 0,
      main: '-',
      description: '-',
      sunrise: 0,
      sunset: 0,
      pressure: 0,
      humidity: 0,
      sealevel: 0,
      gndLevel: 0,
      isLoading: false,
    }
  };
}


async getWeather() {
  this.setState({isLoading:true})
  try {
    let response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      this.state.city +
      '&APPID=3f91b3f39095ba09a6271dd782392f61&units=metric'
    );
    let responseJson = await response.json();
    this.setState({isLoading:false})
    return this.setState({
      forecast: {
        temp: responseJson.main.temp,
        speed: responseJson.wind.speed,
        main: responseJson.weather[0].main,
        desc: responseJson.weather[0].description,
        sunrise: responseJson.sys.sunrise,
        sunset: responseJson.sys.sunset,
        pressure: responseJson.main.pressure,
        humidity: responseJson.main.humidity,
        seaLevel: responseJson.main.sea_level,
        gndLevel: responseJson.main.grnd_level, 
      }
    });
  } catch (error) {
    alert("maaf anda belum memasukkan nama kota")
  }
}

render() {
  return (
    <View style={styles.container}>
{/* bagian header */}
      <View style={styles.header}>
        <Text style={{color: 'white'}}>
          Prakiraan Cuaca
        </Text>
        
      </View> 
{/* bagian box input */}
      <View style={styles.box}>
        <Text style={styles.text}>
          Masukkan Nama Kota
        </Text>
        <TextInput 
        style={styles.inputText}
        placeholder="  input nama kota"
        onChangeText={( city )=> this.setState({ city })} />
        <TouchableOpacity
          style = {styles.button}
          onPress={()=> this.getWeather()}>
            <Loading show={this.state.isLoading}/>
          <Text style={{marginBottom:70}}>Check</Text>
        </TouchableOpacity>
      </View> 

{/* bagian deskripsi cuaca */}
      <View style={styles.deskripsi}>
{/* disini saya membaginya menjadi 5 bagian */}
{/* 1. bagian Temp dan Wind */}
        <View style={styles.section}>
          <View style={styles.inSection}>
            <Image source={require('./imgs/temp.png')}style={styles.img} />
            <Text> 
              Temp  : {'\n'}{this.state.forecast.temp}{'°Celcius \n'}
            </Text>
          </View>
          <View style={styles.inSection}>
            <Image source={require('./imgs/wind.png')}style={styles.img} />
            <Text> 
              Wind Speed  : {'\n'}{this.state.forecast.speed}
            </Text>
          </View>
        </View>
{/* 2. bagian Main dan main Desc */}
        <View style={styles.section}>
          <View style={styles.inSection}>
            <Image source={require('./imgs/main.png')}style={styles.img} />
            <Text> 
              Main  : {'\n'}{this.state.forecast.main}
            </Text>
          </View>
          <View style={styles.inSection}>
            <Image source={require('./imgs/mainDesc.png')}style={styles.img} />
            <Text> 
              Main Desc : {'\n'}{this.state.forecast.desc}
            </Text>
          </View>
        </View>
{/* 3. bagian sunrise dan sunset */}
        <View style={styles.section}>
          <View style={styles.inSection}>
            <Image source={require('./imgs/sunrise.png')}style={styles.img} />
            <Text> 
              sunrise : {'\n'}{this.state.forecast.sunrise}
            </Text>
          </View>
          <View style={styles.inSection}>
            <Image source={require('./imgs/sunset.png')}style={styles.img} />
            <Text> 
              Sunset  : {'\n'}{this.state.forecast.sunset}
            </Text>
          </View>
        </View>
{/*4. bagian preasure dan Humadity */}
        <View style={styles.section}>
          <View style={styles.inSection}>
            <Image source={require('./imgs/pressure.png')}style={styles.img} />
            <Text> 
              pressure  : {'\n'}{this.state.forecast.pressure}
            </Text>
          </View>
          <View style={styles.inSection}>
            <Image source={require('./imgs/humidity.png')}style={styles.img} />
            <Text> 
              Humidity  : {'\n'}{this.state.forecast.humidity}
            </Text>
          </View>
        </View>
{/* 5. bagian sea Level dan ground level */}
        <View style={styles.section}>
          <View style={styles.inSection}>
            <Image source={require('./imgs/seaLevel.png')}style={styles.img} />
            <Text> 
              Sea Level : {'\n'}{this.state.forecast.seaLevel}
            </Text>
          </View>
          <View style={styles.inSection}>
            <Image source={require('./imgs/groundLevel.png')}style={styles.img} />
            <Text> 
              Ground Level  : {'\n'}{this.state.forecast.gndLevel}
            </Text>
          </View>
        </View>
      </View> 

{/* bagian footer dari App */}
      <View style={styles.footer}>
        <Text style={{color: 'white'}}>
          {'\u00A9'}MartaWerdaya13 2019
        </Text>
      </View> 
    </View>
    );
  }
}

const styles = StyleSheet.create({
container : {
  flex: 1,
  backgroundColor: 'white',
},
header:{
  flex:1,
  backgroundColor: '#173e43',
  width: "100%",
  justifyContent: 'center',
  alignItems: 'center',
},
box:{
  flex:3,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#3fb0ac',
  margin: 7,
},
inputText: {
  width: 200,
  height: 40,
  marginTop: 10,
  backgroundColor: 'white',
},
button: {
  marginTop: 30,
  width: 190,
  height: 30,
  backgroundColor: '#fae596',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
},
deskripsi:{
  flex: 6,
  flexDirection: 'column',
  backgroundColor: '#6ed3cf',
  margin: 7,
},
section:{
  flexDirection: 'row',
  marginTop: 10,
  marginLeft: 14,
},
inSection:{
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  width: 150,
  marginLeft: 8,
},
img:{
  width: 50,
  height: 50,
  backgroundColor: '#62bcfa',
},
text:{
  marginLeft: 10,
  justifyContent: 'space-between',
  marginTop: 15,
},

footer:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#173e43',
},
});
// Apps ini dibuat oleh : Kadek Marta werdaya
// mohon tidak mengcopy atau menduplikat tanpa seizin dari pembuat
// etika itu penting