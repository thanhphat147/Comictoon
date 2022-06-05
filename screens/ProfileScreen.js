import React, { Component,useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,
  FlatList,Alert,Modal,Pressable,KeyboardAvoidingView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
//import ImagePicker from 'react-native-image-picker';

class Profile extends Component{
  
  
  constructor(props){
    super(props);
    this.onPress = this.xoaTheLoai.bind(this);
    this.state={
      user_id:'',
      user_name:'User',
      user_pass:'',
      user_cover_image:'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg',
      user_avata:'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
      favorite_comics:'',
      favorite_styles:'',
      modalVisible: false,
      modalVisible2: false,
      idPopup: '',
      urlPicture: '',
    }
    
  }
  onPress(txt) {
    console.log(txt);
  }
  xoaTheLoai=async(id)=>{
        var get_id_user = '';
        try {
          const storedValue = await AsyncStorage.getItem("dataUser");
          const data = JSON.parse(storedValue);
          // console.log("dataUser profile:",data);
          get_id_user = data[0].user_id;
          console.log(get_id_user);
      } catch (error) {
          console.log('Error There was an error.')
      }

      const dataInsert = {
        user_id: get_id_user,
        style_id: id,
      };
      var url = `${BASE_URL}/deleteTheLoai`;
      axios.post(url,dataInsert).then((response)=>{
          console.log(response);

      }).catch((error)=>{
          console.log(error);
      });
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
      });
      this.props.navigation.navigate('Profile');
  };

  setModalVisible = (visible,idPopup) => {
    this.setState({idPopup: idPopup})
    this.setState({ modalVisible: visible });
  }
  setModalVisible2 = (visible,idPopup) => {
    this.setState({idPopup: idPopup})
    this.setState({ modalVisible2: visible });
  }
  
  updateAvatar = async (urlIMG)=>{
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
      user_avata: urlIMG,
    };
    var url = `${BASE_URL}/updateAvatar`;
      axios.post(url, dataInsert).then((response) => {
        //console.log(response);
      }).catch((error) => {
        console.log("LỗI axios");
      });
  }
  
  handleUpload = async (image)=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','comicProject')
    data.append("cloud_name","robotic") 
  
    fetch("https://api.cloudinary.com/v1_1/robotic/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json()).
    then(data=>{
      this.state.urlPicture = data.url;
      this.state.user_avata = data.url;
        //setModal(false)
        console.log('link:'+this.state.urlPicture);
        this.updateAvatar(this.state.urlPicture);

       
    }).catch(err=>{
        console.log("Lỗi đăng hình lên!")
    })
    const storedValue1 = await AsyncStorage.getItem("UpdateLoginUsername");
    const dataX1 = JSON.parse(storedValue1);
    const storedValue2 = await AsyncStorage.getItem("UpdateLoginpass");
    const dataX2 = JSON.parse(storedValue2);
    console.log('aa: '+dataX1);
    console.log('aa: '+dataX2);

    this.dnLogin(dataX1,dataX2);
  }
  dnLogin=(dataX1,dataX2)=>{
    const dataLogin = {
      user_name: dataX1,
      user_pass: dataX2
    };
    //gửi dữ liệu
    var url = `${BASE_URL}/login`;
    axios.post(url,dataLogin)
    .then((response)=>{
      if(response.data != "0"){
        AsyncStorage.setItem("dataUser",JSON.stringify(response.data) );
      }
      
    }).catch((error)=>{
     
         
    });
     
  };
  handleUploadBackground = async (image)=>{
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','comicProject')
    data.append("cloud_name","robotic") 
  
    fetch("https://api.cloudinary.com/v1_1/robotic/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json()).
    then(data=>{
        this.state.user_cover_image = data.url;
        //setModal(false)
        console.log('link:'+data.url);
        this.updateBackground(data.url);

       
    }).catch(err=>{
        console.log("Lỗi đăng hình lên!")
    })
    const storedValue1 = await AsyncStorage.getItem("UpdateLoginUsername");
    const dataX1 = JSON.parse(storedValue1);
    const storedValue2 = await AsyncStorage.getItem("UpdateLoginpass");
    const dataX2 = JSON.parse(storedValue2);
    console.log('aa: '+dataX1);
    console.log('aa: '+dataX2);

    this.dnLogin(dataX1,dataX2);
  }
  updateBackground = async (urlIMG)=>{
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
      user_cover_img: urlIMG,
    };
    var url = `${BASE_URL}/updateBackground`;
      axios.post(url, dataInsert).then((response) => {
        //console.log(response);
      }).catch((error) => {
        console.log("LỗI axios");
      });
  }

  pickFromGallery = async ()=>{
    const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if(granted){
         let data =  await ImagePicker.launchImageLibraryAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              aspect:[1,1],
              quality:0.5
          })
          if(!data.cancelled){
              let newfile = { 
                uri:data.uri,
                type:`test/${data.uri.split(".")[1]}`,
                name:`test.${data.uri.split(".")[1]}` 
                
            }
            this.handleUpload(newfile)
            
          }
    }else{
       Alert.alert("Lỗi")
    }
 }
 pickBackgroundFromGallery = async ()=>{
  const {granted} =  await Permissions.askAsync(Permissions.CAMERA_ROLL)
  if(granted){
       let data =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
        if(!data.cancelled){
            let newfile = { 
              uri:data.uri,
              type:`test/${data.uri.split(".")[1]}`,
              name:`test.${data.uri.split(".")[1]}` 
              
          }
          this.handleUploadBackground(newfile)
          
        }
  }else{
     Alert.alert("Lỗi")
  }
}
 pickFromCamera = async ()=>{
  const {granted} =  await Permissions.askAsync(Permissions.CAMERA)
  if(granted){
       let data =  await ImagePicker.launchCameraAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
      if(!data.cancelled){
          let newfile = { 
            uri:data.uri,
            type:`test/${data.uri.split(".")[1]}`,
            name:`test.${data.uri.split(".")[1]}` 

        }
        this.handleUpload(newfile)
      }
  }else{
     Alert.alert("Lỗi chụp ảnh")
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

        var url = `${BASE_URL}/get-my-styles`+data[0].user_id;
        axios.get(url)
            .then((aData)=>{
                //console.log(aData.data);
                this.setState({
                  favorite_styles: aData.data,
                })
            })
            
        if(data){
          this.setState({
            user_avata:data[0].user_avata,
            user_name: data[0].user_name,
            user_cover_image: data[0].user_cover_img,
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
            user_avata:'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
            favorite_comics:'',
          })
        }
        
    } catch (error) {
        console.log('Error There was an error.')
    }
  }
  render() {
    const { modalVisible } = this.state;
    const { modalVisible2 } = this.state;
    return (
      <View>
      <View style={styles.centeredView}>
                      <Modal
                        isOpen={this.state.isOpen}
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert("Modal has been closed.");
                          this.setModalVisible(!modalVisible);
                        }}
                      >
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <View>
                              <Pressable
                                onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                 <Text style={{textAlign:'right'}}>Đóng</Text>

                              </Pressable>
                            </View>
                            
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => this.onPress(this.state.idPopup)}
                            >
                              <Text style={styles.textStyle2}>Xoá thể loại</Text>
                            </Pressable>
                            
                          </View>
                        </View>
                      </Modal>
                      <Modal
                        isOpen={this.state.isOpen}
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                          Alert.alert("Modal has been closed.");
                          this.setModalVisible2(!modalVisible2);
                        }}
                      >
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <View>
                              <Pressable
                                onPress={() => this.setModalVisible2(!modalVisible2)}
                                >
                                 <Text style={{textAlign:'right'}}>Đóng</Text>

                              </Pressable>
                            </View>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => this.pickFromGallery()}
                            >
                              <Text style={styles.textStyle2}>Đổi ảnh đại diện</Text>
                            </Pressable>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => this.pickFromCamera()}
                            >
                              <Text style={styles.textStyle2}>Chụp ảnh đại diện</Text>
                            </Pressable>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => this.pickBackgroundFromGallery()}
                            >
                              <Text style={styles.textStyle2}>Đổi ảnh bìa</Text>
                            </Pressable>
                            
                          </View>
                        </View>
                      </Modal>
                    </View>
      <View style={styles.labelTrangCaNhan}>
      <Feather name="user" size={24} color="purple" />
      <Text style={{fontSize:15,marginLeft:10}}>Trang cá nhân</Text>
      </View>
    
      <Image source={{uri:this.state.user_cover_image}} style={styles.imgBackround} />
      <View style={styles.viewAvata}> 

      <Pressable
          onPress={() => this.setModalVisible2(true)}
          >
              <Image source={{uri:this.state.user_avata}} style={styles.imgAvata} />
      </Pressable>

      <Text style={{fontSize:25}}>{this.state.user_name}</Text>
      </View>
      <View style={styles.btnDanhSachYeuThich}>
      <AntDesign name="heart" size={24} color="red" />
      <Text style={{fontSize:15,marginLeft:20, color:'#fff'}}>Danh sách yêu thích</Text>
      </View>
      <Text style={{fontSize:15,marginLeft:20,}}>Thể loại truyện yêu thích</Text>
     
      
      <View  style={styles.panelStyle}>
      
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Thêm Thể loại')}>
              <Ionicons style={{marginLeft:10,marginTop:10}}  name="add-circle" size={34} color="#782CE8" />
            </TouchableOpacity>
        <FlatList style={styles.flastListStyle}
            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.favorite_styles}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            keyExtractor={(item,index) => index}
            numColumns={3}
            extraData={this.state.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState(() => {
                    return {
                    
                    };
                  });
                }}>
                    {/* <View style={styles.backgroundButtonStyle}>

                      <Text style={styles.textButton}>{item.styles_name}  </Text>
                      
                    </View> */}
                     <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => this.setModalVisible(true,item.styles_id)}
                      >
                      {/* hiển thị tên thể loại */}
                        <Text style={styles.textStyle2}>{item.styles_name}</Text>
                         
                      </Pressable>
              </TouchableOpacity>
              
            )}>

           
            </FlatList>
       
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
  },
  panelStyle:{
    backgroundColor:'#C4C4C4',
    marginLeft: 20,
    marginRight: 20,
    borderRadius:10,
    paddingBottom:10,
  },
  flastListStyle:{
    margin:10,
  },
  flatListStyleBorder:{
    marginLeft:10,
    marginRight:10,
    marginTop:10,

  },
  itemFlatList:{
    backgroundColor:'#8331C3',
    marginRight:10,
    borderRadius:20,
    padding:10,
  },
  backgroundButtonStyle:{
    backgroundColor:'#8331C3',
    marginRight:10,
    marginTop:10,
    padding:10,
    borderRadius:20,
  },
  textButton:{
    color:'white',
    textAlign:'center',
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    display:'flex',
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    alignContent:'flex-end',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  button2: {
    marginRight:0,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 2
  },
  buttonOpen: {
    marginBottom:10,
    backgroundColor: "#8331C3",
    marginRight:10,
  },
  buttonClose: {
    marginTop:10,
    backgroundColor: "#8331C3",
  },
  
  textStyle2: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle3: {
    color: "white",
    backgroundColor: "#2196F3",

    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
