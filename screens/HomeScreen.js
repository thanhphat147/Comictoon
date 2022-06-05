import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ComicShow from '../components/itemList';
import BannerImg from '../assets/banner/banner-comic.jpg';
import {BASE_URL} from '../auth/config';

const numColumn = 3;
class HomeScreen extends Component {
  constructor()
  {
    super();
    this.state = {
      comics_id: '',
      comics_name: '',
      comics_introduce: '',
      comics_style: '',
      comics_img: '',
      comics_cover_img: '',
      like_comics: '',
      comics_state: '',
      dataComic: [],
    };
  }

  //lấy dữ liệu truyện đã nhận từ api
  getComic=()=>{
    var url = `${BASE_URL}/data`;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
          dataComic: aData.data,
        })
    })
  };
  checkFavComic = async (comics_id)=>{
    

    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      // console.log("dataUser profile:",data);
      get_id_user = data[0].user_id;
      //console.log(get_id_user);
    } catch (error) {
        console.log('Lỗi lây ID user')
    }
    const dataInsert = {
      user_id: get_id_user,
      comics_id: comics_id,
    };
    var url = `${BASE_URL}/checkFollow`;
    axios.post(url, dataInsert)
      .then((response) => {
        var valueX = '';
        if (response.data == "0") {
          valueX = 'Follow';
          //console.log('aa');
        }
        else {
          valueX = 'Đã Follow';
          //console.log('zz');

        }
        AsyncStorage.setItem("stateCheck",JSON.stringify(valueX) );

      })
      console.log('get_id_user:'+get_id_user);
      console.log('id'+comics_id);
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
  };
  componentDidMount(){
    this.getComic();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={BannerImg} style= {{width: Dimensions.get('window').width, height: 250,}} resizeMode= "contain"/>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Xếp Hạng')} >
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/1603/1603847.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Xếp hạng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Phân loại')}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6238/6238670.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Thể loại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Mới nhất')}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6828/6828662.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Mới nhất</Text>
          </TouchableOpacity>
          
        </View>
          <View style={{flex:1}}>
              <FlatList
              numColumns={numColumn}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10}}
              data={this.state.dataComic}
              keyExtractor={(item, index) => index}
              extraData={this.state.comics_id}
              renderItem={({ item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.checkFavComic(item.comics_id)
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

  return <HomeScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    
    flex: 1,
  },
  containerInput: {
    marginTop: 35,
    marginBottom: 10,
    height: 35,
    width: 300,
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
    borderRadius: 20,
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  inputSearch: {
    fontSize: 14,
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: 'row',

  },
  btn: {
    borderRadius: 10,
    width: 50,
    height: 50,
    padding: 20,
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  menuTitle: {
    textAlign: 'center',
  },
  
});
