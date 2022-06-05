import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GerneShow = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gerneStyle}>
        <Text style={styles.gerneText}>{item.styles_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    
  },

  gerneStyle:{
    width: 100,
    height: 50,
    alignItems: 'center',
    backgroundColor:"#8331C3",
    margin:10,
    borderRadius:20,
  },
  gerneText: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 4,
    margin:10,
    color:"#fff"
  },
})

export default GerneShow;