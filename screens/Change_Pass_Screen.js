import React,{ Component } from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../auth/config';
import axios, { Axios } from 'axios';

export default class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state={
      user_id:'',
      user_name:'',
      user_pass:'',
      user_name_new:'',
      user_pass_new:'',
    }
  }
  //dang nhap
  dnUpdatePass=()=>{
    //lấy dữ liệu đang có ở textinput
    const dataUpdate = {
      user_pass: this.state.user_pass,
      user_pass_new: this.state.inputUserPass_new,
      user_id:this.state.user_id,
      user_name_new:this.state.user_name,
    };
    //gửi dữ liệu
    var url = `${BASE_URL}/update`;
    if(this.state.user_pass == this.state.inputUserPass){
      if(this.state.inputUserPass_new == this.state.inputUserPass_Renew)
      {
        axios.post(url,dataUpdate)
        .then((response)=>{ 
          console.log(response);
              Alert.alert(
                "Thông báo!",
                "Cập nhật thành công ! Vui lòng đăng nhập lại!",
                [
                  { text: "OK", onPress: () => {
                    AsyncStorage.clear();
                    this.props.navigation.navigate('Đăng nhập');
                    console.log("OK Pressed")} }
                ]
              );
          }).catch((error)=>{
              console.log(error);
        });
      }
      else{
        Alert.alert(
          "Thông báo!",
          "Mật khẩu nhập lại không khớp!!",
          [
            { text: "OK", onPress: () => console.log("Cancel Pressed"),
            style: "cancel" }
          ]
        );
      }
    }
    else{
      Alert.alert(
        "Thông báo!",
        "Mật khẩu không đúng !",
        [
          { text: "OK", onPress: () => console.log("Cancel Pressed"),
            style: "cancel" }
        ]
      );
    }
     
  };
  componentDidMount(){
    this.onLoadDataToAsync();
  }
  onLoadDataToAsync = async ()=>{
      try {
        const storedValue = await AsyncStorage.getItem("dataUser");
        const data = JSON.parse(storedValue);
        console.log("dataUser_changname",data);
        if(data){
          this.setState({
            user_name: data[0].user_name,
            user_id: data[0].user_id,
            user_pass: data[0].user_pass,
          })
        }   
    } catch (error) {
        console.log('Error There was an error.')
    }
  }
  render(){
    return(
      <View styles={styles.container}>
          
          <Text style={styles.title1}>Đổi Mật Khẩu</Text>

          <View style={styles.inforLogin}>

          <Text style={styles.title2}>Nhập Mật Khẩu Cũ</Text>
          <TextInput onChangeText={(inputUserPass=>this.setState({inputUserPass}))}
          style={styles.formInfor} placeholder = "Nhập mật khẩu cũ"
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <Text style={styles.title2}>Nhập Mật Khẩu Mới</Text>
          <TextInput onChangeText={(inputUserPass_new=>this.setState({inputUserPass_new}))}
          style={styles.formInfor} placeholder = "Nhập mật khẩu mới" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <Text style={styles.title2}>Nhập Lại Mật Khẩu Mới</Text>
          <TextInput onChangeText={(inputUserPass_Renew=>this.setState({inputUserPass_Renew}))}
          style={styles.formInfor} placeholder = "Nhập lại mật khẩu mới" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <TouchableOpacity onPress={()=>{this.dnUpdatePass()}}
          style={styles.buttonContaiiner}><Text style={styles.title3}>Xác Nhận</Text></TouchableOpacity>
        </View>
        <Text style={styles.title4}>Trở về</Text>
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
