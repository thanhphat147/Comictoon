import React,{ Component } from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Alert } from 'react-native';
import axios, { Axios } from 'axios';
import {BASE_URL} from '../auth/config';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id:'',
      user_name:'',
      user_pass:'',
      user_avatar:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg',
      user_cover_img:'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg',
      favorite_comics:'',
      favorite_styles:'',
    }
  }
   //Thêm dữ liệu
    //dang nhap
    dnRegister=()=>{
      if(!this.state.inputUserName){
          //thông báo
        Alert.alert(
          "Thông báo!",
          "Tên tài khoản không được để trống!!",
          [
            { text: "OK", onPress: () => console.log("Cancel Pressed"),
            style: "cancel" }
          ]
        ); 
      }
      else if (!this.state.inputUserPass || !this.state.inputUserPass_Re){
        //thông báo
        Alert.alert(
          "Thông báo!",
          "Mật khẩu không được để trống!!",
          [
            { text: "OK", onPress: () => console.log("Cancel Pressed"),
            style: "cancel" }
          ]
        ); 
      }
      else if (this.state.inputUserPass != this.state.inputUserPass_Re){
        //thông báo
        Alert.alert(
          "Thông báo!",
          "Mật khẩu nhập lại không khớp!!",
          [
            { text: "OK", onPress: () => console.log("Cancel Pressed"),
            style: "cancel" }
          ]
        ); 
      }
      else{
        //lấy dữ liệu đang có ở textinput
        const dataRegister = {
          user_name: this.state.inputUserName,
          user_pass: this.state.inputUserPass,
          user_cover_img:this.state.user_cover_img,
          user_avata:this.state.user_avatar,
        };
        //gửi dữ liệu
        var url = `${BASE_URL}/register`;
        axios.post(url,dataRegister).then((response)=>{
          //thông báo
        Alert.alert(
          "Thông báo!",
          "Tạo tài khoản thành công!!",
          [
            { text: "OK", onPress: () => {
              this.props.navigation.navigate('Đăng nhập');} }
          ]
        ); 
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });
      }
      
       
    };
  render(){
    return(
      <View styles={styles.container}>
          <Text style={styles.title1}>Tạo Tài Khoản</Text>

          <View style={styles.inforLogin}>

          <Text style={styles.title2}>Tên tài khoản</Text>
          <TextInput onChangeText={(inputUserName=>this.setState({inputUserName}))} 
          style={styles.formInfor} placeholder = "Nhập tên tài khoản"
          returnKeyType='next' autoCorrect={false}/>

          <Text style={styles.title2}>Nhập Mật khẩu</Text>
          <TextInput onChangeText={(inputUserPass=>this.setState({inputUserPass}))} 
          style={styles.formInfor} placeholder = "Nhập mật khẩu" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <Text style={styles.title2}>Nhập Lại Mật khẩu</Text>
          <TextInput onChangeText={(inputUserPass_Re=>this.setState({inputUserPass_Re}))}
          style={styles.formInfor} placeholder = "Nhập lại mật khẩu" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <TouchableOpacity style={styles.buttonContaiiner}
          onPress={this.dnRegister.bind(this)}>
          <Text style={styles.title3}>Xác Nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>this.props.navigation.navigate('Đăng nhập')}>
          <Text style={styles.title5}>Trở về</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inforLogin:{
    marginTop:20,
    alignSelf:'center',
    width:350,
    height:450,
    backgroundColor: '#E3E3E3',
    borderRadius:10,  
  },
  title1:{
    fontWeight: 'bold',
    fontSize: 35,
    color: '#747070',
    alignItems: 'center',
    textAlign:'center',
    marginTop:100,

  },
  title2:{
    fontSize: 18,
    color: '#782CE8',
    marginLeft: 20,
    marginTop:30,
  },
  title3:{
    fontSize: 24,
    color: 'white',
    fontWeight:'bold',
  },
  title4:{
    fontSize: 18,
    color: '#782CE8',
    marginLeft: 20,
    marginTop:30,
    alignItems: 'center',
    textAlign:'center',
    textDecorationLine:'underline',
  },
  title5:{
    fontSize: 18,
    color: '#782CE8',
    marginLeft: 20,
    marginTop:30,
    alignItems: 'center',
    textAlign:'center',
    textDecorationLine:'underline'
  },
  formInfor:{
    height:40,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#782CE8',
    paddingHorizontal:10,
    color:'#747070',
  },
  buttonContaiiner:{
    backgroundColor:'#4DC742',
    paddingVertical:10, 
    marginTop:40,
    marginLeft: 20,
    marginRight:20,
    borderRadius:20,
    alignItems:'center',
    fontWeight:'bold',
    color:'white',
  },
});
