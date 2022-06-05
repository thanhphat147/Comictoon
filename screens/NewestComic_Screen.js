import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '../auth/config';
import ComicShow from '../components/itemList';
import BannerImg from '../assets/banner/banner-comic.jpg';

const numColumn = 3;
class NewestComic extends Component {
  constructor()
  {
    super();
    this.state = {
      comics_id: '',
      comics_name: '',
      comics_img: '',
      comics_cover_img: '',
      like_comics: '',
      newestComic: [],
    };
  }

  //lấy dữ liệu truyện mới nhất đã nhận từ api
  getNewest=()=>{
    var url = `${BASE_URL}/newest`;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
            newestComic: aData.data,
        })
    })
  };
  
  componentDidMount(){
    this.getNewest();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={BannerImg} style= {styles.BannerImg} resizeMode= "stretch"/>
        <View style={{flex:1}}>
          <FlatList
            numColumns={numColumn}
            data={this.state.newestComic}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10}}
            extraData={this.state.comics_id}
            renderItem={({ item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Giới thiệu')
                  AsyncStorage.setItem('dataComic', JSON.stringify({data: item}))
                  }} >
                <ComicShow item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      
    );
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <NewestComic {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  BannerImg: {
    width: Dimensions.get('window').width, 
    height: 250,
  }
});
