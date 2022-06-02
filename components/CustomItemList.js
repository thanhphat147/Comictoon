import React, {Component} from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const HorizontalComicShow = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        key={new Date()}
        source={{ uri: item.imgComic }}
        style={styles.imgItem}
      />
      <View style={styles.comicInfo}>
        <Text style={{fontWeight: "bold", fontSize: 14}}>{item.title}</Text>
        <View style={styles.showLike}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/833/833472.png' }} style={{width: 23, height: 23}} />
          <Text style={{fontWeight: "bold", marginLeft: 10, fontSize: 14}}>{item.likeVote}</Text>
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
  },
  imgItem: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  comicInfo: {
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  showLike: {
    flexDirection: "row",
    marginTop: 10,
  }
});
export default HorizontalComicShow;