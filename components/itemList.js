import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";


const ComicShow = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        key={new Date()}
        source={{ uri: item.comics_img }}
        style={styles.imgItem} 
        resizeMode= "stretch"
      />
      <View>
        <Text style={styles.title}>{item.comics_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  imgItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 15
  }
});
export default ComicShow;