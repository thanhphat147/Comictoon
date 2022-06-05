import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ChapterShow = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.chapterStyle}>
        <Text style={styles.episodeName}>{item.episode_name}</Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginRight: 30,
    marginBottom: 20
  },

  chapterStyle:{
    backgroundColor: '#cacaca',
    width: 100,
    height: 50,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 5
  },
  episodeName: {
    fontWeight: "bold", 
    fontSize: 14,
    textAlign: 'center',
    
  }
})

export default ChapterShow;