import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const HorizontalComicShow = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        key={new Date()}
        source={{ uri: item.comics_img }}
        style={styles.imgItem}
        resizeMode= "stretch"
      />
      <View style={styles.comicInfo}>
        <Text style={{fontWeight: "bold", fontSize: 15}}>{item.comics_name}</Text>
        <View style={styles.showLike}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png' }} style={{width: 23, height: 23}} />
          <Text style={{fontWeight: "bold", marginLeft: 20, fontSize: 14,}}>{item.like_comics}</Text>
        </View>
        <View style={styles.wrapStyle}>
          <Text style={styles.styleComic}>{item.comics_style}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e1e1e1',
    width: 350,
    
    
  },
  imgItem: {
    width: 140,
    height: 120,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    
  },
  comicInfo: {
    justifyContent: 'center',
    marginLeft: 50,
    
  },
  showLike: {
    flexDirection: "row",
    marginTop: 10,
  },
  styleComic: {
    fontWeight: "bold", 
    fontSize: 14,
    marginTop: 10,
    color: '#fff'
  },
  wrapStyle: {
    width: 100,
    height: 50,
    alignItems: 'center',
    backgroundColor:"#b79dde",
    padding:5,
    borderRadius:20,
  }
});
export default HorizontalComicShow;