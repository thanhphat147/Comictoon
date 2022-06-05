import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image, FlatList, Alert, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BASE_URL } from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Axios } from 'axios';

const Tab = createMaterialTopTabNavigator();

export default class ThemTheLoaiScreen extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.checkTheLoai.bind(this);
    this.state = {
      styles_id: '',
      styles_name: '',
      dataStyles: [],
    };
  }
  onPress(txt) {
    console.log(txt);
  }
  checkTheLoai = async (id) => {
    var get_id_user = '';
    try {
      const storedValue = await AsyncStorage.getItem("dataUser");
      const data = JSON.parse(storedValue);
      // console.log("dataUser profile:",data);
      get_id_user = data[0].user_id;
      //console.log(get_id_user);
      //console.log(id);
    } catch (error) {
      console.log('Error There was an error.')
    }
    const dataInsert = {
      user_id: get_id_user,
      style_id: id,
    };
    var url = `${BASE_URL}/checkTheLoai`;
    axios.post(url, dataInsert)
      .then((response) => {
        if (response.data == "0") {
          this.insertTheLoai(id);
        }
        else {
          Alert.alert(
            "Chú ý!",
            "Thể loại truyện đã tồn tại trong trang cá nhân",
            [
              { text: "OK" }
            ]
          );
        }
      })
  };
  insertTheLoai = async (id) => {
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
    var url = `${BASE_URL}/addTheLoai`;
    axios.post(url, dataInsert).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
    this.props.navigation.navigate('Profile');



  };
  getStyles = () => {
    //lấy dữ liệu đang có ở textinput

    //gửi dữ liệu
    var url = `${BASE_URL}/get-styles`;
    axios.get(url)
      .then((aData) => {
        //console.log(aData.data);
        this.setState({
          dataStyles: aData.data,
        })
      })

  };
  componentDidMount() {
    this.getStyles();
  };
  render() {
    return (
      <View>


        <View style={styles.btnDanhSachYeuThich}>
          <Entypo name="add-to-list" size={24} color="black" />
          <Text style={{ fontSize: 15, marginLeft: 20, color: 'black' }}>Danh sách các thể loại truyện</Text>
        </View>

        <View style={styles.panelStyle}>
          <FlatList style={styles.flastListStyle}
            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.dataStyles}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={(item, index) => index}
            numColumns={3}
            extraData={this.state.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.onPress(item.styles_id)}
              >
                <View style={styles.backgroundButtonStyle}>

                  {/* hiển thị tên thể loại */}
                  <Text style={styles.textButton}>{item.styles_name}  </Text>
                </View>

              </TouchableOpacity>
            )}></FlatList>
        </View>







      </View>

    );
  }
}

const styles = StyleSheet.create({

  btnDanhSachYeuThich: {
    flexDirection: 'row',
    margin: 20,
    padding: 10,
    //backgroundColor:'purple',
    borderRadius: 20,
  },
  panelStyle: {
    backgroundColor: '#C4C4C4',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    paddingBottom: 10,
  },
  flastListStyle: {
    margin: 10,
  },
  flatListStyleBorder: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,

  },
  itemFlatList: {
    backgroundColor: '#8331C3',
    marginRight: 10,
    borderRadius: 20,
    padding: 10,
  },
  backgroundButtonStyle: {
    backgroundColor: '#8331C3',
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },

});
