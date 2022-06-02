import React, {Component} from 'react';
import {StyleSheet } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Constants from 'expo-constants';
// You can import from local files
import Navigation from './components/HomeStack';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Navigation />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});