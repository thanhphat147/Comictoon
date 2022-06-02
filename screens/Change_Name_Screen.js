import React,{ Component } from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Alert } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../auth/config';
import axios, { Axios } from 'axios';


export default class ChangeName extends Component {
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
  dnUpdateName=()=>{
    //lấy dữ liệu đang có ở textinput
    const dataUpdate = {
      user_name_new: this.state.inputUserName,
      user_pass_new: this.state.inputUserPass,
      user_id:this.state.user_id,
      user_pass:this.state.user_pass
    };
    //gửi dữ liệu
    var url = `${BASE_URL}/update`;
    if(this.state.user_pass == this.state.inputUserPass){
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
          <Text style={styles.title1}>Đổi Tên</Text>

          <View style={styles.inforLogin}>

          <Text style={styles.title2}>Nhập Tên Mới</Text>
          <TextInput onChangeText={(inputUserName=>this.setState({inputUserName}))}
          style={styles.formInfor} placeholder = "Nhập tên tài khoản"
          returnKeyType='next' autoCorrect={false} />

          <Text style={styles.title2}>Nhập Mật khẩu</Text>
          <TextInput onChangeText={(inputUserPass=>this.setState({inputUserPass}))}
          style={styles.formInfor} placeholder = "Nhập mật khẩu" 
          returnKeyType='next' autoCorrect={false} secureTextEntry={true}/>

          <TouchableOpacity onPress={()=>{this.dnUpdateName()}} style={styles.buttonContaiiner}><Text style={styles.title3}>Xác Nhận</Text></TouchableOpacity>
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
