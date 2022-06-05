import React, {Component} from 'react';
import { StyleSheet, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import {BASE_URL} from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalComicShow from '../components/CustomItemList';

// const Tab = createMaterialTopTabNavigator();

export default class XepHangScreen extends Component {
  constructor()
  {
    super();
    this.state = {
      comics_id: '',
      comics_name: '',
      comics_img: '',
      comics_cover_img: '',
      like_comics: '',
      likeData: [],
    };
  }

  //lấy dữ liệu truyện mới nhất đã nhận từ api
  getLikeComic=()=>{
    var url = `${BASE_URL}/like`;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
          likeData: aData.data,
        })
    })
  };
  
  componentDidMount(){
    this.getLikeComic();
  };

  render(){
    return (
      <View style={styles.container}>
        <Image source={{uri: "https://khenphim.com/wp-content/uploads/2020/12/Doraemon-2020-4-banner-e1607620367703.jpg"}} style={styles.backgroundCover} resizeMode="stretch" />
          <View style={{flex:1}}>
          <FlatList
            data={this.state.likeData}
            keyExtractor={(item, index) => index}
            extraData={this.state.comics_id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10}}
            renderItem={({ item, index}) => (
              <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Giới thiệu')
                    AsyncStorage.setItem('dataComic', JSON.stringify({data: item}))
                }} >
                <HorizontalComicShow item={item} />
              </TouchableOpacity>
            )}
            />
            {/* <Tab.Navigator
              initialRouteName="Month"
              screenOptions={{
                tabBarActiveTintColor: '#eb0e0e',
                tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                tabBarStyle: { 
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: '#fff',
                  },
                
              }}
              >
              <Tab.Screen
                name="XH Tháng"
                component={RankByMonth}
                options={{ tabBarLabel: 'Tháng' }}
              />
              <Tab.Screen
                name="XH Năm"
                component={RankByYear}
                options={{ tabBarLabel: 'Năm' }}
              />
            </Tab.Navigator> */}
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1
  },
  
  backgroundCover: {
    height: 250, 
    width: Dimensions.get('window').width, 
  }
});