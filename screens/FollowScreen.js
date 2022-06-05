import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,FlatList,Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {BASE_URL} from '../auth/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ComicShow from '../components/itemList';
import BannerImg from '../assets/banner/banner-comic.jpg';
import { useNavigation } from '@react-navigation/native';
const numColumn = 3;
class Profile extends Component{
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
  getComic=async()=>{
        const storedValue = await AsyncStorage.getItem("dataUser");
        const dataID = JSON.parse(storedValue);
        // console.log("dataUser profile:",data);

        var url = `${BASE_URL}/follow`+dataID[0].user_id;
        //var url = `${BASE_URL}/data`;
        axios.get(url)
        .then((aData)=>{
            // console.log(aData.data);
            this.setState({
              dataComic: aData.data,
            })
        })
  };
  
  componentDidMount(){
    this.getComic();
  };
  render() {
    return (
      <View style={styles.container}>
       <Image source={{uri:'https://www.feduraluniversity.com/wp-content/uploads/2021/03/photo-1507842217343-583bb7270b66.jpeg'}} style={styles.imaBackground} />
      <Text style={{fontSize:20,margin:20}}>Danh sách truyện theo dõi</Text>
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

  return <Profile {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
 
  panel:{
    flexDirection:'row',
  },
  panelMain:{
    backgroundColor: '#C4C4C4',
      borderRadius:20,
      marginLeft:'5%',
      marginRight:'5%',
      paddingTop:'4%',
      paddingBottom:'4%',
      paddingLeft:'3%',
      paddingRight:'3%',
  },
  
  
  imgAvata:{
    width:80, 
    height:80,
    margin:7,
    flexDirection:'row',
    borderRadius:20,

  },
  
  
  imaBackground:{
    width:'120%', 
    height:150,
    marginRight:30,

  },
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
