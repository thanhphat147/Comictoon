import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Styles from './Styles';
import Colors from './Colors';
import MyHeader from './MyHeader';

import Profile from '../screens/ProfileScreen'
import Home from '../screens/HomeScreen'
import Follow from '../screens/FollowScreen'
import Setting from '../screens/SettingScreen'
import Search from '../screens/SearchScreen'

export default function ColorScreen({ route, navigation }) {
  // console.log("Screen:",route.params);

  const viewRef = React.useRef(null);
  const [chooseScreen, setChooseScreen] = useState();

  useEffect(() => {
    switch (route.name) {
      case 'Home':  { setChooseScreen("home"); break; }
      case 'Search':  { setChooseScreen("search"); break; }
      case 'Follow': { setChooseScreen("follow"); break; }
      case 'Profile': { setChooseScreen("profile"); break; }
      case 'Setting': { setChooseScreen("setting"); break; }
      default: setChooseScreen("home");
    }
  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
    })
    return () => unsubscribe;
  }, [navigation])
  if(chooseScreen == "home"){
    return (
      <View style={Styles.container}>
      <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            style={Styles.container}>

            <Home/>
            
          </Animatable.View>
      
    </View>
    )
  }
  else if(chooseScreen == "search"){
    return (
          <View style={Styles.container}>
          <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            style={Styles.container}>

            <Search />
            
          </Animatable.View>
          
        </View>
        )
  }
  else if(chooseScreen == "profile"){
    return (
      
          <View style={Styles.container}>
          <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            style={Styles.container} >
            <Profile />
          </Animatable.View>
        </View>
        )
  }
  else if(chooseScreen == "follow"){
    return (
          <View style={Styles.container}>
          <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            style={Styles.container}>

            <Follow />
            
          </Animatable.View>
        </View>
        )
  }
  else if(chooseScreen == "setting"){
    return (
          <View style={Styles.container}>
          <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            style={Styles.container}>

            <Setting />
            
          </Animatable.View>
        </View>
        )
  }
  else{
    return (

      <View style={Styles.container}>
      <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        style={Styles.container}>
        <View style={styles.container}>
    </View>
      </Animatable.View>
    </View>
    
  )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAvata:{
    width:60, 
    height:60,
    borderRadius:30,
    marginRight:30
  }
});

