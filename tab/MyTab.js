import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from './Icons';
import Colors from './Colors';
import Screen from './Screen';
import * as Animatable from 'react-native-animatable';
import Profile from '../screens/ProfileScreen'
const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Entypo, icon: 'home', component: Screen, color: Colors.purple, alphaClr: Colors.purpleAlpha },
  { route: 'Search', label: 'Search', type: Icons.FontAwesome5, icon: 'search', component: Screen, color: Colors.purple, alphaClr: Colors.purpleAlpha },
  { route: 'Follow', label: 'Follow', type: Icons.FontAwesome, icon: 'th-large', component: Screen, color: Colors.purple, alphaClr: Colors.purpleAlpha },
  { route: 'Profile', label: 'Profile', type: Icons.FontAwesome5, icon: 'user', component: Screen, color: Colors.purple, alphaClr: Colors.purpleAlpha },
  { route: 'Setting', label: 'Setting', type: Icons.AntDesign, icon: 'setting', component: Screen, color: Colors.purple, alphaClr: Colors.purpleAlpha },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  useEffect(() => {
    if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
      viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
      textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    } else {
      viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
      textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.65}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 20 }]} />
        <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.purple} />
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: Colors.white, paddingHorizontal: 8
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default class NavigationTab extends Component {
  constructor(props){
    super(props);
    // console.log('prop mytab: ', props);
  }
  
  render() {
    return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'relative',
          backgroundColor:'#e5e9f0',
          borderRadius: 13
        }
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
         
        )
      })}
    
      
    </Tab.Navigator>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
   

  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  }
})