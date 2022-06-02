import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ComicShow from '../components/itemList';
import Comic from '../components/Comic';
import BannerImg from '../assets/banner/banner-comic.jpg';
const numColumn = 3;

class HomeScreen extends Component {
  state = {
    data: [
      {
          id: 1,
          title: 'Harry Porter',
          category: 'tiểu thuyết',
          dateCreated: '1997',
          imgComic: 'https://m.media-amazon.com/images/I/71Q1Iu4suSL._AC_SL1000_.jpg',
          likeVote: 2
      },
      {
        
          id: 2,
          title: 'Doraemon',
          category: 'Hài hước',
          dateCreated: '1997',
          imgComic: 'https://m.media-amazon.com/images/M/MV5BYzIzOWQ3NDYtOTFlOC00OGMwLTgwZWItNWI2ZDlmZGEwNGQ3XkEyXkFqcGdeQXVyODAzNzAwOTU@.jpg',
          likeVote: 34,
        
      },
      {
        id: 3,
        title: 'One piece',
        category: 'Phiêu lưu',
        dateCreated: '1997',
        imgComic: 'https://i.pinimg.com/originals/6a/f3/87/6af387457739795e0b206aa27b17b457.jpg',
        likeVote: 200,
        
      }, 
      {
        id: 4,
        title: 'Naruto',
        category: 'Hành động',
        dateCreated: '1997',
        imgComic: 'https://img1.ak.crunchyroll.com/i/spire4/5568ffb263f6bcba85a639980b80dd9a1612993223_full.jpg',
        likeVote: 120,
        
      }, 
      {
        id: 5,
        title: 'Dragon ball',
        category: 'Hành động',
        dateCreated: '1997',
        imgComic: 'https://dragonballwiki.net/xemphim/wp-content/uploads/2017/06/b1490089c2c0f46a4058e82f9889a3aa.jpg',
        likeVote: 107,
        
      }, 
    ],
    
    error: null,
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={BannerImg} style= {{height: 230, maxWidth: 500}} resizeMode= "contain"/>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Xếp Hạng')} >
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/128/1603/1603847.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Xếp hạng</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6238/6238670.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Thể loại</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/6828/6828662.png" }} style={ styles.btn } />
            <Text style={ styles.menuTitle }>Mới nhất</Text>
          </TouchableOpacity>
          
        </View>
        <View>
        <View style={{flex:1}}>
            <FlatList
            numColumns={numColumn}
            data={this.state.data}
            keyExtractor={(item) => item}
            extraData={this.state.id}
            renderItem={({ item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Giới thiệu', { 
                    data: item
                    })}} >
                <ComicShow item={item} />
              </TouchableOpacity>
            )}
            />
        </View>
        </View>
        
          
      </View>

      
    );
  }
}

export default function(props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
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
  listContainer: {
  }
});
