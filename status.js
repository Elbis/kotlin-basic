import React from 'react';
import {Text, TouchableOpacity, TextInput,ImageBackground, KeyboardAvoidingView, View, StyleSheet} from 'react-native'
import { DatePicker, Picker} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements'
import moment from 'moment'
export default class status extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selected:undefined,
      meetingName:'',
      byName:'',
      currentTime:moment(),
      minimumTime: moment().format("YYYY,M,D"),
      chosenDate:new Date(),
      year:moment().format("YYYY,M,D").split(",")[0],
      month:moment().format("YYYY,M,D").split(",")[1],
      day:moment().format("YYYY,M,D").split(",")[2],
      monthSubs : parseInt(moment().format("YYYY,M,D").split(",")[1])-1,
      buttons:['09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00','18:00-18:30']

    }
    this._onPickerValueChange=this._onPickerValueChange.bind(this)
    this.setDate=this.setDate.bind(this)
  }
  static navigationOptions = {
    title: "YER AYIR"
  }
  setDate(newDate) {
    console.log("girdim")
    console.log(newDate.toString().substr(4, 12))
    this.setState({ chosenDate: newDate });
  }
  _onPickerValueChange = (value: String) => {
    console.log(value)
  this.setState({
    selected: value
  });
}
makeReservation = ()=>{
  let dbDate = this.state.chosenDate
  dbDate.setDate(dbDate.getDate() +1)
  fetch('http://10.77.2.206:3000/postBooking',{
    method:'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      hourindex:this.state.selected,
      date:dbDate,
      meetingTitle:this.state.meetingName,
      bookedBy:this.state.byName,
      meeting_room_id:1,
    })
  })
}

updateHour(){
  var year=this.state.minimumTime.split(",")[0]
  var month=this.state.minimumTime.split(",")[1]
  var day=this.state.minimumTime.split(",")[2]
  var monthSubs=parseInt(month)-1
  return alert(year+","+monthSubs+","+day)
}
  render(){
    var {navigate} = this.props.navigation
    var today = moment()
    return(
      <ImageBackground source={require('/home/linux-ozellik/Masaüstü/brrs/src/img/gray-bg.png')} style={styles.Container}>
      <View style={styles.TopStyle}>
          <View style={styles.datePickerStyle}>
          <View style={{marginTop:5}}>
          <Icon
            name="calendar"
            size={30}
            color='#fff'

          />
          </View>

          <DatePicker
             //defaultDate={new Date(this.state.currentTime.add(1,"days").format("YYYY,MM,DD"))}
             minimumDate={new Date(this.state.year, this.state.monthSubs, this.state.day)}
             maximumDate={new Date(2023, 12, 31)}
             locale={"en"}
             timeZoneOffsetInMinutes={undefined}
             modalTransparent={false}
             animationType={"fade"}
             androidMode={"default"}
             placeHolderText="Tarih seçiniz"
             textStyle={{ color: "#fff" }}
             placeHolderTextStyle={{ color: "#fff" }}
             onDateChange={this.setDate}
             />
             <Icon
               name='sort-down'
               size={15}
               color='#fff'

             />
             </View>
             <View style={styles.pickerStyle}>
             <View style={{marginTop:5}}>
             <Icon
               name='hourglass'
               size={30}
               color='#fff'

             />
             </View>
             <Picker
               note
               mode="dropdown"
               style={{ width: 100, color:'#fff' }}
               selectedValue={this.state.selected}
               onValueChange={this._onPickerValueChange.bind(this)}>
                  <Picker.Item label="Saat seçiniz" value={null}/>
               {
                 this.state.buttons.map((item, i) => (
                   <Picker.Item label={this.state.buttons[i]} value={i} key={i}/>
                 ))
                 }
             </Picker>
             <Icon
               name='sort-down'
               size={15}
               color='#fff'

             />
             </View>
            </View>
            <KeyboardAvoidingView behavior='padding'>
              <TextInput
                                 style={styles.textInput} placeholder='Toplantı Başlığı'
                                 onChangeText={(meetingName) => this.setState({meetingName})}
                                 underlineColorAndroid='transparent'
                                 maxLength={20}
                                 onSubmitEditing={()=> this.byName.focus()}/>
              <TextInput
                                 style={styles.textInput} placeholder='Sorumlu Adı'
                                 onChangeText={(byName) => this.setState({byName})}
                                 underlineColorAndroid='transparent'
                                 ref={(input) => this.byName=input}
                                 />
                                 <Button title="YER AYIR"
                                 iconRight
                                 icon={{
                                   name: 'fast-forward',
                                   size:25,
                                   color:'#fff'
                                 }}
                                 onPress={
                                     ()=>{
                                       if(this.state.meetingName==null || this.state.byName==null || this.state.selected==null){
                                         alert("Lütfen isteklerinizi belirtin.")
                                         return
                                       }
                                       this.makeReservation()
                                       this.props.navigation.goBack()
                                     }
                                 }
                                 buttonStyle={{justifyContent:'center', backgroundColor:'#feba02', alignSelf:'stretch', borderRadius:5}}
                                 />

            </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  TopStyle: {
    flexDirection:'row',
    flex:0.5,
    borderWidth:1,
    borderColor:'#fff',
    borderRadius:15,
    width:350,
    marginBottom:15,
  },
  datePickerStyle: {
    flexDirection:'row',
    alignItems:'center',
    flex:0.5,
    marginLeft:10,
  },
  textInput:{
        fontSize: 16,
        width:350,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius:5,
        borderWidth:0.5,
        borderColor:'green'
    },
    btn:{
        height: 40,
        alignSelf:'stretch',
        backgroundColor:'blue',
        padding:10,
        alignItems:'center',
        borderRadius:5,
        },
  pickerStyle: {
    alignItems:'center',
    flexDirection:'row',
    flex:0.5
  },
})
