import React from 'react';
import { StyleSheet, Platform, Image, Text, View, AsyncStorage, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
            verifyCode:'',
        };
        this.verify=this.verify.bind(this)
    }

    componentDidMount() {
        // firebase things?
    }
    verify(){
        const code=this.state.verifyCode
        if(code=="WWW"){
            AsyncStorage.setItem("launched", 'true')
            this.props.navigation.navigate("splash")
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
            
                <Image source={require("C:/Users/asan/Desktop/RNFirebase/tedarik/react-native-firebase-starter/src/img/splash.jpg")} style={{ width: '100%', height: '30%' }}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 36, color: '#fff' }}> Doğrulayın. </Text>
                <View style={{ marginTop: 20, alignItems: 'center', borderWidth: 1, borderColor: '#fff', width: '90%', height:'50%', borderRadius: 15 }}>
                    <TextInput onChangeText={(verifyCode) => this.setState({verifyCode})} placeholder="Doğrulama Kodu" style={{ width: '80%', fontSize: 20, backgroundColor: '#fff', textAlign: 'center', borderRadius: 25, marginTop: 30, justifyContent: 'center', alignItems: 'center' }} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
                    <Button
                        title="GÖNDER"
                        color="#fff"
                        fontWeight="bold"
                        textStyle={{ textAlign: 'center', fontSize: 20 }}
                        buttonStyle={{ justifyContent: 'center', backgroundColor: '#d3d3d3', marginTop: 10, width: '80%', borderRadius: 25 }}
                        containerViewStyle={{ width: '100%', alignItems: 'center' }}
                        onPress={ () => this.verify()}
                    />


                    <View style={{marginTop:40, marginBottom:10,  justifyContent:'center', alignItems:'center', width:'90%'}}>

                        <Text style={{ fontSize: 15, color:'#d3d3d3' }}> *Doğrulama kodunuzu, tedarik sayfanıza giriş yaparak alabilirsiniz. Doğrulama kodu uygulama yüklü olduğu sürece bir daha sorulmayacaktır.</Text>



                    </View>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        color: '#fff'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#753A8A',
    }
});
