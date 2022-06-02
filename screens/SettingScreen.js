import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Profile extends Component{
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      user_name:'',
      user_pass:'',
      user_avatar:'',
      user_cover_image:'',
      favorite_comics:'',
      favorite_styles:'',
      login:'Đăng nhập',
      onTouchableOpacity:false,
    }
  }

  componentDidMount(){
    this.onLoadDataToAsync();
  }
  onLoadDataToAsync = async ()=>{
      try {
        const storedValue = await AsyncStorage.getItem("dataUser");
        const data = JSON.parse(storedValue);
        // console.log("dataUser_setting",data);
        if(data){
          this.setState({
            user_avatar:data[0].user_avatar,
            user_name: data[0].user_name,
            user_cover_image: data[0].user_cover_image,
            favorite_comics: data[0].favorite_comics,
            login:'Đăng xuất',
          })
        }   
    } catch (error) {
        console.log('Error There was an error.')
    }
  }
  onTouchableOpacity=()=>{
    if(this.state.login == "Đăng xuất"){
      this.setState({
        onTouchableOpacity:false,
      })
    }
  }
  changeLable=()=>{
    if(this.state.login == "Đăng xuất"){
      AsyncStorage.clear();
      this.props.navigation.navigate('Đăng nhập');
      this.setState({login:'Đăng nhập'})
    }
    else{
      this.props.navigation.navigate('Đăng nhập');
    }
  }
  render() {
    return (
    <View>
    <View style={styles.labelTrangCaiDat}>
    <AntDesign name="setting" size={24} color="purple" />
    <Text style={{fontSize:15,marginLeft:10}}>Trang Cài Đặt</Text>
    </View>
      
      <View style={styles.panelMain}>
      
      <TouchableOpacity
        onPress={()=>this.changeLable()}
        style={styles.loginBtn}>
      <Text style={styles.title1}>{this.state.login}</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={this.state.onTouchableOpacity}
      onPress={()=>this.props.navigation.navigate('Đổi tên')}
        style={styles.loginBtn}>
        <Text style={styles.title1}>Đổi tên</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={this.state.onTouchableOpacity}
      onPress={()=>this.props.navigation.navigate('Đổi pass')}
        style={styles.loginBtn}>
        <Text style={styles.title1}>Đổi mật khẩu</Text>
      </TouchableOpacity>

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
   textItem:{
    margin:10,
    color:"#fff"
  },
  panelMain:{
    backgroundColor: '#C4C4C4',
      borderRadius:20,
      marginLeft:20,
      marginRight:20,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTrangCaiDat:{
    alignItems:"center",
    margin:15,
    marginLeft: 20,
    flexDirection: 'row',
    color:"purple",
  },
  loginBtn: {
    marginTop: 10,
    marginBottom:20,
    width: 120,
    marginLeft:20,
  },
  title1:{
    textDecorationLine:'underline',
  },
});
