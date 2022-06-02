import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import HorizontalComicShow from './CustomItemList';

export default class RankByMonth extends Component {
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

  render(){
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
            <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            extraData={this.state.id}
            renderItem={({ item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState(() => {
                    return {
                      title: item.title,
                      imgComic: item.imgComic,
                      likeVote: item.likeVote,
                    };
                  });
                }}>
                <HorizontalComicShow item={item} />
              </TouchableOpacity>
            )}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
});