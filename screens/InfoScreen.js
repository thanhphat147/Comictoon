import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, Pressable, TouchableOpacity, FlatList} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChapterShow from '../components/listChapter'

const likedImg = require('../assets/like.png');
const defaultLikeImg = require('../assets/liked.png');
const defaultFavComic = require('../assets/default-fav.png');
const favComic = require('../assets/fav.png');
const numColumn = 2;


class InfoScreen extends Component {
  constructor(props) {
    super();
    this.state = { showDefaultLike: true };
    this.state = { showDefaultFav: true };
  }
  
  state = {
    data: [
      {
        
        chapter: 'chapter 1',
      },
      {
        chapter: 'chapter 2',
        
      },
      {
        chapter: 'chapter 3',
      }
    ],
    
    error: null,
    
  }

  renderLikeComic = () => {
    const imgSrc = this.state.showDefaultLike? defaultLikeImg : likedImg;
    return (
      <Image
        source={ imgSrc }
        style={{width: 30, height: 30}}
      />
    );
  }

  renderFavComic = () => {
    const imgSrc = this.state.showDefaultFav? defaultFavComic : favComic;
    return (
      <Image
        source={ imgSrc }
        style={{width: 30, height: 30}}
      />
    );
  }

  render() {
    const { data } = this.props.route.params;
    // const {added} = this.state;
    return(
      <View style={styles.container}>
        <View>
          <Image source={{ uri: data.imgComic }} style={{maxWidth: 700, height: 230}} resizeMode="stretch"/>
          <View style={styles.infoView}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.interactView}>
              <TouchableOpacity
              onPress={ () => this.setState(
                { showDefaultLike: !this.state.showDefaultLike }
              )}>
                {this.renderLikeComic()}
              </TouchableOpacity>
              <TouchableOpacity 
              style={{marginLeft: 20}}
              onPress={ () => this.setState(
                { showDefaultFav: !this.state.showDefaultFav }
              )}>
                {this.renderFavComic()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1}}>
            <FlatList
            numColumns={numColumn}
            data={this.state.data}
            keyExtractor={(item) => item.comic}
            extraData={this.state.id}
            renderItem={({ item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Giới thiệu', { 
                    data: item.comic
                    })}} >
                <ChapterShow item={item} />
              </TouchableOpacity>
            )}
            />
        </View>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  infoView: {
    flexDirection: 'row',
    alignItems: "center",
    height: 60,
    justifyContent: 'space-between',
  },
  interactView: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#e2e2e2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10 
  },
  title: {
    fontSize: 18,
    margin: 20,
    marginLeft: 10,
    fontWeight: "bold",
    textAlign: "left"
  }
})

export default function(props) {
  const navigation = useNavigation();
  return <InfoScreen {...props} navigation={navigation} />;
}