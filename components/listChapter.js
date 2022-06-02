import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ChapterShow = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.chapterStyle}>
        <Text style={{fontWeight: "bold", fontSize: 14}}>{item.chapter}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chapterStyle:{
    backgroundColor: '#cacaca',
    borderRadius: 10,
  }
})

export default ChapterShow;