import React,{ Component } from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity ,Alert } from 'react-native';
import axios, { Axios } from 'axios';
import {BASE_URL} from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id:'',
      user_name:'',
      user_pass:'',
      user_avata:'',
      user_cover_image:'',
      favorite_comics:'',
      favorite_styles:'',
      dataUser:[],
    };
  }
  // onSaveDataToAsync = async ()=>{
  //   try {
  //     await AsyncStorage.setItem("dataUser",JSON.stringify("abc") );
  //     console.log('Saved Successful');
  // } catch (error) {
  //   console.log('Error login There was an error.')
  // }
  // }
   //dang nhap
   dnLogin=()=>{
    //lấy dữ liệu đang có ở textinput
    const dataLogin = {
      user_name: this.state.inputUserName,
      user_pass: this.state.inputUserPass
    };
    //gửi dữ liệu
    var url = `${BASE_URL}/login`;
    axios.post(url,dataLogin)
    .then((response)=>{
    // var data1 = response.data;
    //  console.log("Login_screen:",data1);
      if(response.data != "0"){
         //thông báo
      Alert.alert(
        "Thông báo!",
        "Đăng nhập thành công!!!",
        [
          { text: "OK", onPress: () => {
            this.props.navigation.navigate('Trang cá nhân');
            AsyncStorage.setItem("dataUser",JSON.stringify(response.data) );
            AsyncStorage.setItem("UpdateLoginUsername",JSON.stringify(dataLogin.user_name) );
            AsyncStorage.setItem("UpdateLoginpass",JSON.stringify(dataLogin.user_pass) );
            // this.setState({dataUser:data1});
            //  this.onSaveDataToAsync();
          }}
            // this.props.navigation.push('Home Screen',{data1})}}
        ]
      ); 
        //console.log("Login success");
      }
       else{
      //thông báo
      Alert.alert(
        "Thông báo!",
        "Kiểm tra lại tên tài khoản và mật khẩu!!",
        [
          { text: "OK", onPress: () => console.log("Cancel Pressed"),
          style: "cancel" }
        ]
      ); 
        console.log("loi");
       }   
    }).catch((error)=>{
      //thông báo
      Alert.alert(
        "Thông báo!",
        "Loi!!",
        [
          { text: "OK", onPress: () => {
            console.log(error);} }
        ]
      );   
    });
     
  };

render(){
    return(
      <View styles={styles.container}>
          <Text style={styles.title1}>Đăng Nhập</Text>

          <View style={styles.inforLogin}>

          <Text style={styles.title2}>Tên tài khoản</Text>
          <TextInput onChangeText={(inputUserName=>this.setState({inputUserName}))} 
          style={styles.formInfor} placeholder = "Nhập tên tài khoản"
          returnKeyType='next' autoCorrect={false}/>

          <Text style={styles.title2}>Nhập Mật khẩu</Text>
          <TextInput onChangeText={(inputUserPass=>this.setState({inputUserPass}))} 
          style={styles.formInfor} placeholder = "Nhập mật khẩu" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <TouchableOpacity 
          style={styles.buttonContaiiner} 
          onPress={this.dnLogin.bind(this)}>
          <Text style={styles.title3}>Xác Nhận</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          onPress={()=>this.props.navigation.navigate('Đăng ký')}>
          <Text style={styles.title4}>Tạo tài khoản</Text>
          </TouchableOpacity>
      </View>

    )
  }}

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
    height:300,
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
