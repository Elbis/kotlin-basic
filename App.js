import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';

import firebase from 'react-native-firebase';
import navigation, {createSwitchNavigator, NavigationActions, createStackNavigator} from 'react-navigation'
import splash from './src/splash'
import verify from './src/verify'
import webview from './src/webview'


const Navigator = createSwitchNavigator({
  
  splash: {
    screen: splash,
  },
  verify: {
    screen:verify,
  },
  webview: {
    screen: webview,
    
  }, 
  
  
},
)
const InAppNavigator = createSwitchNavigator({
  webview: {
    screen:webview,
    
  },
})

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      // firebase things?
      link:null,
    };
    
  }
  
 /* goWebView = (link) => {
    navigation.navigate('webview', {webViewLink: link})
    AsyncStorage.setItem("webViewLink", "")
}*/
  componentDidMount() {

   this.initialNotificationListener = firebase.notifications().getInitialNotification()
  .then((notificationOpen: NotificationOpen) => {
    if (notificationOpen) {
        console.log("İnitialize ")
        
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      
      const notification: Notification = notificationOpen.notification; 
        console.log(notification.data.link)
        this.setState({link:notification.data.link})
      firebase.notifications().removeAllDeliveredNotifications()
      
    }
})



this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    // Get the action triggered by the notification being opened
   
    
    const action = notificationOpen.action;
    // Get information about the notification that was opened
    const notification: Notification = notificationOpen.notification;
    console.log("notifopen")
    if(notification.data.link){
        console.log(notification.data.link)
        this.setState({link: notification.data.link})
    }
});

    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);

    // the listener returns a function you can use to unsubscribe
    this.unsubscribeFromNotificationListener = firebase.notifications().onNotification((notification) => {
      if (Platform.OS === 'android') {

        const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setChannelId('channelId') // e.g. the id you chose above
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
          

      } else if (Platform.OS === 'ios') {

        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .ios.setBadge(notification.ios.badge);
            
        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));

      }
      
    });
    
    

    
  }

  componentWillUnmount() {
    // this is where you unsubscribe
    this.unsubscribeFromNotificationListener();
    this.notificationOpenedListener();
    
  }
  
  render()  {
      
      
      return <Navigator screenProps={{webViewLink:this.state.link}}/>;
      
      
    
    
  
}
}
 
  