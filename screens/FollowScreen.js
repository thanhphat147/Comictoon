import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default class Profile extends Component{
  render() {
    return (
    <View >
    <Image source={{uri:'https://www.feduraluniversity.com/wp-content/uploads/2021/03/photo-1507842217343-583bb7270b66.jpeg'}} style={styles.imaBackground} />
      
      
      <Text style={{fontSize:20,margin:20}}>Danh sách truyện theo dõi</Text>
      <View style={styles.panelMain}>
        <View style={styles.panel}>
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />

          
          
        </View>
        <View style={styles.panel}>
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
           
        </View>
        <View style={styles.panel}>
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
          <Image source={{uri:'https://file.tinnhac.com/resize/600x-/music/2017/11/20/blackpink-jisoo-fc05.jpg'}} style={styles.imgAvata} />
           
        </View>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
 
  panel:{
    flexDirection:'row',
  },
  panelMain:{
    backgroundColor: '#C4C4C4',
      borderRadius:20,
      marginLeft:'5%',
      marginRight:'5%',
      paddingTop:'4%',
      paddingBottom:'4%',
      paddingLeft:'3%',
      paddingRight:'3%',
  },
  
  
  imgAvata:{
    width:80, 
    height:80,
    margin:7,
    flexDirection:'row',
    borderRadius:20,

  },
  
  
  imaBackground:{
    width:'100%', 
    height:150,
    marginRight:30,

  },
});
