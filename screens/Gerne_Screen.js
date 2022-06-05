import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GerneShow from '../components/itemGerne';
import HorizontalComicShow from '../components/CustomItemList';
import BannerImg from '../assets/banner/banner-comic.jpg';
import {BASE_URL} from '../auth/config';

const numColumn = 3;

class GerneView extends Component {
  constructor()
  {
    super();
    this.state = {
      comics_id: '',
      comics_name: '',
      comics_img: '',
      comics_style: '',
      like_comics: '',
      styles_id: '',
      styles_name: '',
      listGerne: [],
      listComic:[],
      listFilterComic: [],
      isLoading: false,
    };
  }

  //lấy dữ liệu truyện đã nhận từ api
  //lấy danh sách thể loại
  getGerne=()=>{
    var url = `${BASE_URL}/gerne`;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
            listGerne: aData.data,
        })
    })
    this.getComic();
  };

  //get comics
  getComic=()=>{
    var url = `${BASE_URL}/data`;
    this.setState({isLoading:true})
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
            listComic: aData.data,
        })
    }).finally(()=>this.setState({isLoading:false}))
  };

  //lấy danh sách truyện theo thể loại được chọn
  getComicByGerne=(key)=>{
    var url = `${BASE_URL}/data/gerne/`+key;
    axios.get(url)
    .then((bData)=>{
        console.log('truyện theo thể loại:  ',bData.data);
        this.setState({
            listFilterComic: bData.data,
            
        })
    })
  };

  componentDidMount(){
    this.getGerne();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={BannerImg} style= {styles.BannerImg} resizeMode= "stretch"/>
        <Text style={styles.title}>Thể loại</Text>
        <View style={styles.sliderGerne}>
            <View style={{ width: Dimensions.get('window').width}}>
            <FlatList
                data={this.state.listGerne}
                keyExtractor={(item, index) => index}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={({ item}) => (
                <TouchableOpacity
                    onPress={() => {
                      console.log('thể loại đã chọn:  ', item.styles_name);
                      this.getComicByGerne(item.styles_name);
                      
                  }}>
                    <GerneShow item={item} />
                </TouchableOpacity>
                )}
            />
            </View>
        </View>
        <View style={{flex:1}}>
            <FlatList
                data={this.state.listFilterComic && this.state.listFilterComic.length > 0 ? this.state.listFilterComic : this.state.listComic}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 10}}
                extraData={this.state}
                renderItem={({ item}) => (
                <TouchableOpacity
                    onPress={() => {
                    this.props.navigation.navigate('Giới thiệu')
                    AsyncStorage.setItem('dataComic', JSON.stringify({data: item}))
                    }} >
                    <HorizontalComicShow item={item} />
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

  return <GerneView {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    textAlign: 'left', 
    margin: 10, 
    fontSize: 16,
    fontWeight: 'bold',
  },
  BannerImg: {
    width: Dimensions.get('window').width, 
    height: 250,
  },
  sliderGerne:{
    backgroundColor: '#C4C4C4',
  },
});
