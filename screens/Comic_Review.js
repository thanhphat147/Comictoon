import React, {Component} from 'react'
import {View, StyleSheet, FlatList, Image, Dimensions, Text } from 'react-native'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Comic_Review extends Component {
    constructor()
    {
      super();
      this.state = {
        episode_id: '',
        episode_name: '',
        episode_img: '',
        episode_Data: [],
      };
    }
    
    onLoadDataToAsync = async ()=>{
      try {
        const storedValue = await AsyncStorage.getItem('imgEpisode');
        const data = JSON.parse(storedValue);
        // console.log('data episode img: ', data)
        if(data){
          this.setState({
            episode_id: data.data.episode_id,
            episode_img: data.data.episode_img,
          })
          this.getImageEpisode();
        }
    } catch (error) {
        console.log('error There was an error.')
    }
  }

  componentDidMount(){
    this.onLoadDataToAsync();
    
  }
  getImageEpisode = () => {
    var imgData = this.state.episode_img.split(',');
    // console.log('episode img: ', imgData);
    this.setState({
      episode_Data: imgData
    })
    
  }

    render() {
      return (
        <View style={styles.container}>
          <Text>{this.state.episode}</Text>
          <View style={styles.listView}>
            <View style={{flex:1}}>
              <FlatList
              data={this.state.episode_Data}
              keyExtractor={(item, index) => index}
              extraData={this.state}
              renderItem={({item}) => {
                // console.log("item is: ",item);
                return (
                  <View>
                    <Image
                      source={{ uri: item ? item : null }}
                      style={styles.imgItem} 
                      resizeMode='stretch'
                    />
                  </View>
                )
              }}
              />
            </View>
          </View>
          
          
        </View>
  
        
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    listView: {
      flexDirection: 'row'
    },
    imgItem: {
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height,
        marginTop: 10
    },
  })
//   export default function(props) {
//     const navigation = useNavigation();
  
//     return <Comic_Review {...props} navigation={navigation} />;
//   }