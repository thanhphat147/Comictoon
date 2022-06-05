import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationContainer } from '@react-navigation/native'

import NavigationTab from '../tab/MyTab';

import XepHangScreen from "../screens/XepHangScreen";
import InfoScreen from "../screens/InfoScreen";
import Login from "../screens/Login_Screen"
import Register from "../screens/Register_Screen"
import ChangeName from "../screens/Change_Name_Screen"
import ChangePassword from "../screens/Change_Pass_Screen"
import Comic_Review from "../screens/Comic_Review"
import NewestComic from '../screens/NewestComic_Screen'
import GerneView from '../screens/Gerne_Screen'
import TheLoaiScreen from "../screens/TheLoaiScreen";
import ThemTheLoaiScreen from "../screens/ThemTheLoaiScreen";
const Stack = createNativeStackNavigator(); 

export default class HomeStack extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Trang Chủ" component={NavigationTab} options={{ headerShown: false }} />
          <Stack.Screen name="Xếp Hạng" component={XepHangScreen} />
          <Stack.Screen name="Thể loại" component={TheLoaiScreen} />
          <Stack.Screen name="Giới thiệu" component={InfoScreen} />
          <Stack.Screen name="Đăng nhập" component={Login}/>
          <Stack.Screen name="Đăng ký" component={Register}/>
          <Stack.Screen name="Đổi tên" component={ChangeName}/>
          <Stack.Screen name="Đổi pass" component={ChangePassword}/>
          <Stack.Screen name="Trang cá nhân" component={NavigationTab} options={{ headerShown: false }}/>
          <Stack.Screen name="Thêm Thể loại" component={ThemTheLoaiScreen} />
          <Stack.Screen name="Đọc truyện" component={Comic_Review}/>
          <Stack.Screen name="Mới nhất" component={NewestComic}/>
          <Stack.Screen name="Phân loại" component={GerneView}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}