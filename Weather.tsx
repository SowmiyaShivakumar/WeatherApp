import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ImageBackground, Image, StyleSheet, Button, Pressable, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
// import { useFocusEffect } from '@react-navigation/native';

const Weather=()=>{
  const[weather, setWeather] = useState<any | null>(null);
  const[city, setCity] = useState("");
  const[temper, setTemper] = useState<any | null>(null);
  const[feel, setFeel] = useState<any | null>(null);
  const[humidity, setHumidity] = useState<any | null>(null);
  const[wind, setWind] = useState<any | null>(null);
  const[rise, setRise] = useState<any | null>(null);
  const[set, setSet] = useState<any | null>(null);
  const apiKey = 'd336120b4988f61123b4fbf6bca72aa6';
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const fetchWeather = async() =>{
    try{
      const cityNew = encodeURIComponent(city);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNew}&units=metric&appid=${apiKey}`);
      const data:any = await response.json();
      console.log(data);
      setWeather(data);
      setTemper(data.main.temp);
      setFeel(data.main.feels_like);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setRise(data.sys.sunrise);
      setSet(data.sys.sunset);
    }catch(error){
      console.error("Fetching Data");
    }
  };
  const fetchData = ()=>{
    fetchWeather();
  }
  const weatherIcon: { [key:string]:any } = {
    '01d' : require('./assets/images/clear_sky.jpg'),
    '01n' : require('./assets/images/clear_sky.jpg'),
    '02d' : require('./assets/images/few.jpg'),
    '02n' : require('./assets/images/few.jpg'),
    '03d' : require('./assets/images/scattered.jpg'),
    '03n' : require('./assets/images/scattered.jpg'),
    '04d' : require('./assets/images/overcast.jpg'),
    '04n' : require('./assets/images/overcast.jpg'),
    '50d' : require('./assets/images/mist.jpg'),
    '50n' : require('./assets/images/mist.jpg'),
    '13d' : require('./assets/images/snow.jpg'),
    '13n' : require('./assets/images/snow.jpg'),
    '10d' : require('./assets/images/rain.png'),
    '10n' : require('./assets/images/rain.png'),
    '09d' : require('./assets/images/drizzle.jpg'),
    '11d' : require('./assets/images/thunderstorm.jpg'),
  }
  const iconCode = weather?.weather[0]?.icon;
  const displayIcon = weatherIcon[iconCode];

//   useFocusEffect(
//     React.useCallback(() => {
//       setWeather(null);  // Reset the state when the screen is focused
//       setTemper(null);
//     }, [])
//   );
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
         <Text style={styles.heading}>Get the Current Forecast Data</Text>
         <TextInput 
          placeholder="Search"
          value={city}
          onChangeText={(text)=> setCity(text)}
          style={styles.search}
          />
          <TouchableOpacity onPress={fetchData}>
          <Image source={ require('./assets/images/search.png')} style={styles.searchicon}/>
          </TouchableOpacity>
          
          {/* <Pressable onPress={fetchData} style={styles.btn}>
            <Text style={styles.btn_text}>Show Weather Data</Text>
            </Pressable> */}
          {weather && (<>
          <Image source={displayIcon} style={styles.icon}/>
          <View>
          <Text style={styles.temp}>{temper}°C</Text>
          <Text> </Text>
          <Text style={styles.desc}>{capitalizeFirstLetter(weather.weather[0].description)} </Text>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Image 
                style={styles.smallIcon}
                source={require('./assets/images/feelLike.png')}
              />
              <Text style={styles.infoText}>{ feel }°C</Text>
              <Text style={styles.infoText}>Feels Like</Text>
            </View>
            <View style={styles.info}>
              <Image 
                style={styles.smallIcon}
                source={require('./assets/images/humi.png')}
              />
              <Text style={styles.infoText}>{ humidity }°C</Text>
              <Text style={styles.infoText}>Humidity</Text>
            </View>
            {/*  */}
          </View>
          <View style={styles.extraInfo}>
          <View style={styles.info}>
              <Image 
                style={styles.smallIcon}
                source={require('./assets/images/wind.png')}
              />
              <Text style={styles.infoText}>{ wind } m/s</Text>
              <Text style={styles.infoText}>Wind Speed</Text>
            </View>
            <View style={styles.info}>
              <Image 
                style={styles.smallIcon}
                source={require('./assets/images/sunrise.png')}
              />
              <Text style={styles.infoTextRS}>{ new Date(rise*1000).toLocaleString() }</Text>
              <Text style={styles.infoTextRS}>Sun Rise</Text>
            </View>
          </View>
          {/*  */}
          <View style={styles.extraInfo}>
          <View style={styles.info}>
              <Image 
                style={styles.smallIcon}
                source={require('./assets/images/sunset.png')}
              />
              <Text style={styles.infoTextRS}>{ new Date(set*1000).toLocaleString() }</Text>
              <Text style={styles.infoTextRS}>Sun Set</Text>
            </View>
          </View>
          {/*  */}
          </View>
          {/* <Text style={styles.temp}>{weather.weather[0].main}</Text> */}
          </>
          )}  
    </View>
    </TouchableWithoutFeedback>
      )}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#2f3640'
    },
    heading:{
      marginTop: 30,
      fontSize: 30,
      color: '#fff',
      fontFamily: 'cursive',
      fontWeight: '800',
      textAlign: 'center'
    },
    search:{
      margin: 40,
      marginTop: 20,
      backgroundColor: 'aliceblue',
      padding: 10,
      borderRadius: 10,
      color: 'black',
      borderWidth: 1,
    },
    searchicon:{
      width: 25,
      marginLeft: 279,
      marginTop: -80,
      height: 30
    },
   
    btn:{
      borderRadius: 10,
      backgroundColor: '#1DB952',
      width: 200,
      height: 45,
      marginLeft: 80,
      marginTop: 20,
      paddingLeft: 8,
      paddingTop: 8
    },
    btn_text:{
      color: 'black',
      fontSize: 20,
      fontStyle: 'italic',
      marginLeft: 8,
      
    },
    temp:{
      marginTop: -56,
      marginLeft: 70,
      color: 'pink',
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'cursive'
    },
    desc:{
      marginTop: 8,
      color: '#f7d8ba',
      fontSize: 30,
      fontWeight: '600',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontStyle: 'italic'
    },
    icon:{
      width: '20%',
      height: '10%',
      alignSelf: 'auto',
      marginLeft: 80,
      marginTop: -8,
      borderRadius: 10
    },
    extraInfo:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 7,
      marginTop: 16
    },
    info:{
      width: Dimensions.get('screen').width / 2.5,
      height: 100,
      backgroundColor: '#CAF1DE',
      padding: 10,
      borderRadius: 15,
      justifyContent: 'center'
    },
    smallIcon:{
      height: 40,
      width: 40,
      borderRadius: 20,
      marginLeft: 40
    },
    infoText:{
      textAlign: 'center',
      fontSize: 18
    },
    infoTextRS:{
      textAlign: 'center',
      fontSize: 15
    }
  })
export default Weather;




