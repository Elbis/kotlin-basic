//https://yt3.ggpht.com/a-/AN66SAx4CxGXwictrIdOIako-En3A2rrLAoDgnmfFA=s900-mo-c-c0xffffffff-rj-k-no
import React, { Component } from 'react';
import { WebView } from 'react-native';
import { StackActions } from 'react-navigation'
import firebase from 'react-native-firebase'
export default class App extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.state = {
            // firebase things?
            link: 'https://tedarik.sefamerve.com',
        };
    }



    async componentDidMount() {
        const { navigation, screenProps } = this.props
        if (screenProps.webViewLink != null) {
            this.setState({ link: screenProps.webViewLink })
            console.log("webview:" + screenProps.webViewLink)
        }

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened


            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            if (notification.data.link) {
                this.setState({ link: notification.data.link })
            }
        });/*
      const gelenLink = this.props.navigation.getParam('webViewLink', 'http://www.google.com/')
      console.log("webviewden bildiriyorum: "+gelenLink)
      this.setState({link: gelenLink})*/
    }
    componentWillUnmount() {
        this.notificationOpenedListener();
    }


    render() {
        return (
            <WebView
                source={{ uri: this.state.link }}
                style={{ marginTop: 20 }}
            />
        );
    }
}
