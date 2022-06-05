import React, {Component,useEffect,useState } from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import axios,{ Axios } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChapterShow from '../components/itemChapter';
import {BASE_URL} from '../auth/config';
import { shadow } from 'react-native-paper';
const likedImg = require('../assets/like.png');
const defaultLikeImg = require('../assets/liked.png');
const defaultFavComic = require('../assets/fav.png');
const favComic = require('../assets/default-fav.png');
const numColumn = 2;





class InfoScreen extends Component {
  constructor() {
    super();
    this.state = { showDefaultLike: true };
    this.state = { showDefaultFav: true };
    this.onPress = this.checkFollow.bind(this);
    this.onPress2 = this.likeButton.bind(this);
    this.state = {
      comics_id: '',
      comics_name: '',
      like_comics: 0,
      comics_cover_img:'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg',
      episode_id: '',
      episode_name: '',
      episode_img: '',
      dataEpisode : [],
      followText: '',
    };
  }
  onPress(id) {
    console.log(id);
  }
  onPress2(id) {
    console.log(id);
  }
  likeButton = async (comics_id) => {
    if(this.state.showDefaultLike == true){
      const dataInsert = {
        like_comics: this.state.like_comics-1,
        comics_id: comics_id,
      };
      var url = `${BASE_URL}/updateLike`;
      axios.post(url, dataInsert).then((response) => {
        //console.log(response);
      }).catch((error) => {
        console.log("LỗI axios");
      });
      this.setState({ showDefaultLike: !this.state.showDefaultLike });
      this.setState({ like_comics: this.state.like_comics - 1 });
    }
    else{
      const dataInsert = {
        like_comics: this.state.like_comics+1,
        comics_id: comics_id,
      };
      var url = `${BASE_URL}/updateLike`;
      axios.post(url, dataInsert).then((response) => {
        //console.log(response);
      }).catch((error) => {
        console.log("LỗI axios");
      });
      this.setState({ showDefaultLike: !this.state.showDefaultLike });
      this.setState({ like_comics: this.state.like_comics + 1 });
    }
      
  }
  checkFollow = async (id) => {
    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      get_id_user = data[0].user_id;
    } catch (error) {
      console.log('Không lấy đc ID')
    }
    const dataInsert = {
      user_id: get_id_user,
      comics_id: id,
    };
    var url = `${BASE_URL}/checkFollow`;
    axios.post(url, dataInsert)
      .then((response) => {
        if (response.data == "0") {
          this.setFollow(id);
        }
        else {
          this.unFollow(id);
        }
      })
  };
  setFollow = async (id) => {
    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      get_id_user = data[0].user_id;
      //console.log(get_id_user);
      //console.log(id);
    } catch (error) {
      console.log('Không lấy đc ID user')
    }

    const dataInsert = {
      user_id: get_id_user,
      comics_id: id,
    };
    console.log(get_id_user);
    var url = `${BASE_URL}/addFollow`;
    axios.post(url, dataInsert).then((response) => {
      //console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    this.setState({ showDefaultFav: !this.state.showDefaultFav });
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Follow' }],
    });
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });

  };
  unFollow=async(id)=>{
    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      get_id_user = data[0].user_id;
      //console.log(get_id_user);
  } catch (error) {
      console.log('Không tìm thấy ID')
  }

  const dataInsert = {
    user_id: get_id_user,
    comics_id: id,
  };
  var url = `${BASE_URL}/deleteFollow`;
  axios.post(url,dataInsert).then((response)=>{
      //console.log(response);

  }).catch((error)=>{
      console.log(error);
  });
  this.setState({ showDefaultFav: !this.state.showDefaultFav });
  this.props.navigation.reset({
    index: 0,
    routes: [{ name: 'Follow' }],
  });
  this.props.navigation.reset({
    index: 0,
    routes: [{ name: 'Home' }],
  });
};
  renderLikeComic = () => {
    const imgSrc = this.state.showDefaultLike? defaultLikeImg : likedImg;
    return (
      <View  style={{alignItems:'center'}}>
        <Image
        source={ imgSrc }
        style={{width: 30, height: 30}}
      />
      <Text>{this.state.like_comics}</Text>
      </View>
      
    );
  }
 

 
  checkFavComic = () => {
    
    const dataInsert = {
      user_id: '1',
      comics_id: this.state.comics_id,
    };
    var url = `${BASE_URL}/checkFollow`;
    axios.post(url, dataInsert)
      .then((response) => {
        if (response.data == "0") {
          return true;
        }
        else {
          return false;
        }
      })
  };
  
 
  renderFavComic = () => {
    const imgSrc = this.state.showDefaultFav? defaultFavComic : favComic;
    
      return (
        <View  style={{alignItems:'center'}}>
        <Image
          source={ imgSrc }
          style={{width: 30, height: 30}}
        />
        <Text>{this.state.followText}</Text>
        </View>
       
      );
  }
  


  //nhận dữ liệu từ async storage
  onLoadDataToAsync = async ()=>{
      try {
        const storedValue = await AsyncStorage.getItem('dataComic');
        const data = JSON.parse(storedValue);

        const storedValue2 = await AsyncStorage.getItem("stateCheck");
        const data2 = JSON.parse(storedValue2);
        // const storedValue3 = await AsyncStorage.getItem("stateCheck2");
        // const data3 = JSON.parse(storedValue3);

        this.state.followText = 'Follow' ;
          //get_id_user = data[0].user_id;
         console.log('T1: '+this.state.followText)

        if(data){
          this.setState({
            comics_id: data.data.comics_id,
            comics_name: data.data.comics_name,
            comics_cover_img: data.data.comics_cover_img,
            like_comics: data.data.like_comics,
          })
          this.getEpisode();
        }
    } catch (error) {
        console.log('Error There was an error.')
    }
  }

  getEpisode=()=>{
    var url = `${BASE_URL}/data/`+this.state.comics_id+`/episode`;
    axios.get(url)
    .then((eData)=>{
        // console.log(eData.data);
        this.setState({
          dataEpisode: eData.data,
        })
    })
  };

 
  followButton = async (id) => {
    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      // console.log("dataUser profile:",data);
      get_id_user = data[0].user_id;
      console.log(get_id_user);
    } catch (error) {
      console.log('Lỗi nút follow.')
    }
    const dataInsert = {
      user_id: get_id_user,
      comics_id: id,
    };
    var url = `${BASE_URL}/followButton`;
    axios.post(url, dataInsert).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    



  };
  componentDidMount(){
    this.onLoadDataToAsync();
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <Image source={{ uri: this.state.comics_cover_img }} style={{width: Dimensions.get('window').width, height: 230}} resizeMode="contain"/>
          <View style={styles.infoView}>
            <Text style={styles.title}>{this.state.comics_name}</Text>
            <View style={styles.interactView}>
              <TouchableOpacity
               onPress={() => this.onPress2(this.state.comics_id)}
              >
                {this.renderLikeComic()}
              </TouchableOpacity>
              <TouchableOpacity 
              style={{marginLeft: 20}}
              onPress={() => this.onPress(this.state.comics_id)}
              >
                {this.renderFavComic()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listView}>
            <View style={{flex:1}}>
              <FlatList
              numColumns={numColumn}
              data={this.state.dataEpisode}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10}}
              extraData={this.state.episode_id}
              renderItem={({ item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Đọc truyện')
                    AsyncStorage.setItem('imgEpisode', JSON.stringify({data: item}))
                    }} >
                  <ChapterShow item={item} />
                </TouchableOpacity>
              )}
              />
            </View>
          </View>
          
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  infoView: {
    marginTop:30,
    flexDirection: 'row',
    alignItems: "center",
    height: 60,
    justifyContent: 'space-between',
  },
  interactView: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#e2e2e2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10 
  },
  title: {
    fontSize: 18,
    
    marginLeft: 20,
    fontWeight: "bold",
    textAlign: "left"
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 80,
    marginVertical: 10,
  }
})

export default function(props) {
  const navigation = useNavigation();
  return <InfoScreen {...props} navigation={navigation} />;
}