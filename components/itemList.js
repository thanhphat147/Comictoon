import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";


const ComicShow = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        key={new Date()}
        source={{ uri: item.imgComic }}
        style={styles.imgItem} 
        resizeMode= "cover"
      />
      <View>
        <Text>{item.title}</Text>
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
    width: 90,
    height: 100,
    borderRadius: 10,
    marginTop: 10
  }
});
export default ComicShow;