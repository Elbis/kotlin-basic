import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, AsyncStorage, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
export default class splash extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this.state = {
            // firebase things?
            timePassed: false,
        };
    }
    componentDidMount() {


        const launched = AsyncStorage.getItem("launched")
            .then(value => {
               
                if (value == null) {
                    setTimeout(() => {
                        this.props.navigation.navigate("verify")

                        //Put All Your Code Here, Which You Want To Execute After Some Delay Time.

                    }, 2000);




                }
                else {
                    setTimeout(() => {
                        this.props.navigation.navigate("webview")
                        //Put All Your Code Here, Which You Want To Execute After Some Delay Time.


                    }, 2000);


                }
            })
    }




    render() {
        return (
            <View style={styles.container}>

                <ImageBackground source={require("C:/Users/asan/Desktop/RNFirebase/tedarik/react-native-firebase-starter/src/img/splash.jpg")} style={{width:'100%',height:'80%'}}>

                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', color:'white' }}> YÜKLENİYOR</Text>
                    <Text style={{ fontSize: 44, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', color:'white' }}> . . .</Text>

                </ImageBackground>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#753A8A',
    }
});
