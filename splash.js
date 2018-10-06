import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
export default class splash extends React.Component {
    static navigationOptions = {
        header:null,
      };
    constructor() {
      super();
      this.state = {
        // firebase things?
      };
    }
    componentDidMount(){
      
      const launched = AsyncStorage.getItem("launched")
    .then(value => {
      if (value==null){
        AsyncStorage.setItem("launched",'true')
        this.props.navigation.navigate("verify")
        
      }
      else {
        this.props.navigation.navigate("webview")
      }
    })
    }
   
  
    render() {
      return (
        <ScrollView style={{flex:1}}>
          <Text style={{fontSize:32, fontWeight:'bold', textAlign:'center', alignSelf:'center'}}> LOADING</Text>
          
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });
  