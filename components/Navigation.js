import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/ProfileScreen';
import Search from '../screens/SearchScreen';
import Setting from '../screens/SettingScreen';

export default class Navigation extends Component{
  render() {
    return (
        <MyTabs/>
    );
  }
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const Tab = createBottomTabNavigator();

class MyTabs extends Component {
  constructor(props){
    super(props);
    console.log("Navigation: ",props);
  }
 
   render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#e91e63',
          tabBarActiveBackgroundColor: '#F9EBC8',
          headerShown: false,
          tabBarStyle: {
            borderRadius: 30,
            position: 'relative',
            marginBottom: 15,
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            height: 60,
            paddingLeft: 30,
            paddingRight: 30,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarItemStyle: {
            borderRadius: 30,
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
   }
 }



/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

