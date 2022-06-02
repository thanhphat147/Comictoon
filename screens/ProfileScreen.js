import React, { Component,useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Profile extends Component{
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      user_name:'User',
      user_pass:'',
      user_cover_image:'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg',
      user_avata:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg',
      favorite_comics:'',
      favorite_styles:'',
    }
  }

  componentDidMount(){
    this.onLoadDataToAsync();
  }
  onLoadDataToAsync = async ()=>{
      try {
        const storedValue = await AsyncStorage.getItem("dataUser");
        const data = JSON.parse(storedValue);
        // console.log("dataUser profile:",data);
        if(data){
          this.setState({
            user_avata:data[0].user_avata,
            user_name: data[0].user_name,
            user_cover_image: data[0].user_cover_img,
            favorite_comics: data[0].favorite_comics,
          })
        }
        else{
          AsyncStorage.clear();
          this.setState({
            user_id:'',
            user_name:'User',
            user_pass:'',
            user_cover_image:'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg',
            user_avata:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg',
            favorite_comics:'',
            favorite_styles:'',
          })
        }
        
    } catch (error) {
        console.log('Error There was an error.')
    }
  }
  render() {
    return (
    <View>
    <TouchableOpacity>
      <View style={styles.labelTrangCaNhan}>
      <Feather name="user" size={24} color="purple" />
      <Text style={{fontSize:15,marginLeft:10}}>Trang cá nhân</Text>
      </View>
    </TouchableOpacity>
   
    
    
      <Image source={{uri:this.state.user_cover_image}} style={styles.imgBackround} />
      <View style={styles.viewAvata}> 
      <Image source={{uri:this.state.user_avata}} style={styles.imgAvata} />
      <Text style={{fontSize:25}}>{this.state.user_name}</Text>
      </View>
      <View style={styles.btnDanhSachYeuThich}>
      <AntDesign name="heart" size={24} color="red" />
      <Text style={{fontSize:15,marginLeft:20, color:'#fff'}}>Danh sách yêu thích</Text>
      </View>
      <Text style={{fontSize:15,margin:20}}>Thể loại truyện yêu thích</Text>
      <View style={styles.panelMain}>
        <View style={styles.panel}>
          <View style={styles.btnItem}>
            <Text style={styles.textItem}>Hành động</Text>
          </View>
          <View style={styles.btnItem}>
            <Text style={styles.textItem}>Tiểu Thuyết</Text>
          </View>
          <View style={styles.btnItem}>
            <Text style={styles.textItem}>Love</Text>
          </View>

          
          
        </View>
        <View style={styles.panel}>
          <View style={styles.btnItem}>
          <TouchableOpacity>
              <Text style={styles.textItem}>Mạo hiểm</Text>
          
          </TouchableOpacity>
            </View>
            <View style={styles.btnItem}>
            <TouchableOpacity>
              <Text style={styles.textItem}>Hài hước</Text>
            
            </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity>
              <Ionicons  name="add-circle" size={34} color="#782CE8" />
            </TouchableOpacity>
            </View>
           
        </View>
      </View>
     

    </View>
    
  );
  }
}

const styles = StyleSheet.create({
  textItem:{
    margin:10,
    color:"#fff"
  },
  btnItem:{
      backgroundColor:"#8331C3",
      margin:10,
      flexDirection:'row',
      borderRadius:20,
    },
  panel:{
    flexDirection:'row',
      
  },
  panelMain:{
    backgroundColor: '#C4C4C4',
      borderRadius:20,
      marginLeft:20,
      marginRight:20,
  },
  
  labelTrangCaNhan:{
    alignItems:"center",
    margin:15,
    marginLeft: 20,
    flexDirection: 'row',
    color:"purple",
  },
  imgBackround:{
    width:'100%', 
    height:150,
    borderRadius:20,
    marginRight:30
  },
  imgAvata:{
    width:80, 
    height:80,
    borderRadius:80,
    marginTop:-40,
  },
  btnDanhSachYeuThich:{
    flexDirection: 'row',
    margin:20,
    padding:10,
    backgroundColor:'purple',
    borderRadius:20,
  },
  viewAvata:{
    //backgroundColor:'red',
    alignItems: 'center',
  }
});
