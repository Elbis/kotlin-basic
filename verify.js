import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';


export default class App extends React.Component {
    constructor() {
      super();
      this.state = {
        // firebase things?
      };
    }
  
    componentDidMount() {
      // firebase things?
    }
  
    render() {
      return (
        <ScrollView>
          <Text> verify</Text>
          
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
  