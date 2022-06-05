import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '../auth/config';
import BannerImg from '../assets/covid.png';
import HorizontalComicShow from '../components/CustomItemList';

class SearchScreen extends React.Component {
  constructor()
  {
    super();
    this.state = {
      comics_id: '',
      comics_name: '',
      comics_style: '',
      comics_img: '',
      like_comics: '',
      dataComic: [],
      searchText: ''
    };
  }

  //get comic
  getComic=()=>{
    var url = `${BASE_URL}/data/`;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
          dataComic: aData.data,
        })
    })
  };

  //get comic by key
  getComicByName=(searchText)=>{
    var url = `${BASE_URL}/data/`+searchText;
    axios.get(url)
    .then((aData)=>{
        // console.log(aData.data);
        this.setState({
          dataFilter: aData.data,
        })
    })
  };
  
  componentDidMount(){
    this.getComic();
  };

  updateSearch = (searchText) => {
    this.setState({searchText: searchText});
  
    let filteredData = this.state.dataComic.filter(function (item) {
      return item.comics_name.match(searchText);
    });
  
    this.setState({filteredData: filteredData});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.topHeader}>
          <Searchbar
            style={styles.containerInput}
            inputStyle={styles.inputSearch}
            placeholder="Tác phẩm"
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={this.updateSearch}
            value={this.state.searchText}
          />
        </View>
          <Image source={BannerImg} style= {{height: 230, width: Dimensions.get('window').width}} resizeMode= "cover"/>
          <View style={{flex:1}}>
          <FlatList
          data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.dataComic}
          keyExtractor={(item, index) => index}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10}}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.setState(() => {
                  this.props.navigation.navigate('Giới thiệu')
                  AsyncStorage.setItem('dataComic', JSON.stringify({data: item}))
                });
              }}>
              <HorizontalComicShow item={item} />
            </TouchableOpacity>
          )}></FlatList>
          </View>
      </View>

      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1
  },
  topHeader: {

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
  imgBtn: {
    borderRadius: 50,
    
  },
});

export default function(props) {
  const navigation = useNavigation();

  return <SearchScreen {...props} navigation={navigation} />;
}