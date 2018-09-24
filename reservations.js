import React from 'react';
import {ScrollView, StyleSheet,ToastAndroid, Text, View, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as Progress from 'react-native-progress'
import { Button, ButtonGroup, Overlay} from 'react-native-elements'
import DialogManager, { ScaleAnimation, DialogContent } from 'react-native-dialog-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import { DatePicker, Picker} from 'native-base'
import { extendMoment } from 'moment-range'
export default class status extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      meetingRoomName:'',
      selectedIndex:0,
      status:'KULLANIMDA',
      selectedReservationHour:'',
      startHour:'00:00',
      endHour:'00:00',
      next:0,
      date:"2018-09-01",
      current:'',
      selected:'key3',
      chosenDate:new Date(),
      meetingAvailable:false,
      statusColor:'red',
      selectedHours:[],
      selectedHoursReplace:[],
      percent:0.0,
      meetingName:'',
      byName:'',
      isVisible:true,
      curTime: moment(),
      hour:'',
      intervalid:'',
      intervalid2:'',
      confirmationVisible: false,
      cancellationVisible: false,
      periodStart:'',
      index:0,
      periodEnd:'',
      clickedIndex:-1,
      buttons:['09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00','18:00-18:30'],
      meetingNames: [],
      byNameList: [],

    };
    this.updateHour = this.updateHour.bind(this);
  }
  static navigationOptions = {
    header:null,
  }
  getMeetingName = () => {
    let value=('http://10.77.2.206:3000/getName/1')
    fetch(value)
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({ meetingRoomName:responseJson.meeting_room_name})
    })
    .catch((error) => {
      alert(error)
    })
  }
  getHoursForToday = () => {
    let tarih = moment().format('YYYY-M-D')
    let selectedHoursAgain=[]
    let meetingNamesReplace=[]
    let byNamesReplace=[]
    let value=('http://10.77.2.206:3000/getRoomInfoDaily/1/'+tarih)
    fetch(value)
    .then((response)=>response.json())
    .then((responseJson)=>{
      for ( let i=0; i<responseJson.roomInfo.length; i++){
        selectedHoursAgain.push(responseJson.roomInfo[i].hourindex)
        meetingNamesReplace.push(responseJson.roomInfo[i].title)
        byNamesReplace.push(responseJson.roomInfo[i].bookedby)
        this.setState({
          selectedHours:selectedHoursAgain,
          meetingNames:meetingNamesReplace,
          byNameList:byNamesReplace,
        })
      }


    })
    .catch((error) => {
      alert(error)
    })
  }
  makeReservation = ()=>{
    fetch('http://10.77.2.206:3000/postBooking',{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        hourindex:this.state.index,
        date:moment().format("YYYY-M-D"),
        meetingTitle:this.state.meetingName,
        bookedBy:this.state.byName,
        meeting_room_id:1,
      })
    })
  }

    sortingMeetings(){ //need for get next meeting.
      let selectedHours=this.state.selectedHours
      let byNameList=this.state.byNameList
      let meetingNames = this.state.meetingNames
      for (let i=0; i<selectedHours.length-1; i++){
        let min=i
        for (let j=i; j<selectedHours.length; j++){
          if(selectedHours[j]<selectedHours[min]){
            min=j
          }
        }
        let tmp=selectedHours[i]
        selectedHours[i]=selectedHours[min]
        selectedHours[min]=tmp
        tmp=meetingNames[i]
        meetingNames[i]=meetingNames[min]
        meetingNames[min]=tmp
        tmp=byNameList[i]
        byNameList[i]=byNameList[min]
        byNameList[min]=tmp
      }
      this.setState({
        selectedHours:selectedHours,
        byNameList:byNameList,
        meetingNames:meetingNames
      })
      return
    }



    getCurrent(){
      let anlik=this.state.curTime.format('HH:mm')
      let buttons=this.state.buttons
      for (let i=0;i<buttons.length; i++){
        start=buttons[i].toString().split("-")[0]
        end=buttons[i].toString().split("-")[1]
        if(anlik>=start && anlik <= end){
          this.setState({current:start+"-"+end, nextState:i}, () => {
            return start+"-"+end
          })

        }
      }
    }

    whileMeeting(){
      this.getCurrent()
      let time=this.state.curTime.format('HH:mm')
      let hours=this.state.buttons
      let selectedHours=this.state.selectedHours
      let currentHour = this.state.current

        for (let i=0; i<selectedHours.length;i++){
          if(hours[selectedHours[i]].toString()==currentHour){
            let finish=hours[selectedHours[i]].toString().split("-")[1]
            let finishMinute=finish.toString().split(":")[1]
            let currentMinute=time.toString().split(":")[1]
            if(finishMinute=="00"){ //percent
              let fark=60.0 - parseFloat(currentMinute)
              let percent=1.0-(fark/30.0)
              this.setState({ percent:percent})
            }
            else{
              let fark=30.0 - parseFloat(currentMinute)
              let percent=1.0-(fark/30.0)
              this.setState({ percent:percent})
            }

            this.setState({
              status:"KULLANIMDA",
              statusColor:'red',
              next:i,

            })
            return
          }

        }

            this.setState({
              status:"MÜSAİT",
              statusColor:'green',
              percent:1
            })
            return

        }
        getNextMeeting(){
          for (let i=0; i<this.state.selectedHours.length; i++){
            if(this.state.buttons[this.state.nextState]<this.state.buttons[this.state.selectedHours[i]]){
              return this.state.buttons[this.state.selectedHours[i]]
            }
          }

        }
        getNextMeetingName(){
          for (let i=0; i<this.state.selectedHours.length; i++){
            if(this.state.buttons[this.state.nextState]<this.state.buttons[this.state.selectedHours[i]]){
              return "Sıradaki: "+this.state.meetingNames[i]
            }
          }
        }
        getCurrentMeetingName(){
          for (let i=0; i<this.state.selectedHours.length; i++){
            if(this.state.buttons[this.state.nextState]==this.state.buttons[this.state.selectedHours[i]]){
              return this.state.meetingNames[i]
            }

          }
          return "KULLANILABİLİR"
        }
        getCurrentMeetingByName(){
          for (let i=0; i<this.state.selectedHours.length; i++){
            if(this.state.buttons[this.state.nextState]==this.state.buttons[this.state.selectedHours[i]]){
              return this.state.byNameList[i]
            }

          }
          return "Aşağıdan saat seçimi yapabilirsiniz"
        }

  componentDidMount(){
    {this.getHoursForToday()}
    {this.getMeetingName()}
    this.fonk()
  }

    componentWillMount (){
      var intervalid=setInterval(this.fonk.bind(this),60000)
    //  var intervalid2=setInterval(this.control.bind(this),1000)
        this.setState({
      //   intervalid2:intervalid2,
          intervalid:intervalid
        })



  }

  componentWillUnmount() {
   // use intervalId from the state to clear the interval
   clearInterval(this.state.intervalid);
//   clearInterval(this.state.intervalid2);
}

  fonk() {
this.setState({curTime: moment()})
{this.whileMeeting()}
  }
  getTime(){
    return this.state.curTime.format('HH:mm');
  }



  updateHour (selectedIndexes) {
    buttons=['9-9:30','9:30-10','10-10:30','10:30-11','11-11:30','11:30-12','12-12:30','12:30-13','13-13:30','13:30-14','14-14:30','14:30-15','15-15:30','15:30-16','16-16:30','16:30-17','17-17:30','17:30-18']
    var list = this.state.selectedHours


    if (this.state.selectedHours.includes(selectedIndexes[selectedIndexes.length-1])){
      ToastAndroid.show('Lütfen farklı bir saat aralığı seçin!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return

    }
    if (this.state.buttons[selectedIndexes[selectedIndexes.length-1]]===undefined){
      ToastAndroid.show('Lütfen farklı bir saat aralığı seçin!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return
    }
    this.setState({
       selectedHoursReplace:selectedIndexes,
       index: parseInt(selectedIndexes[selectedIndexes.length-1])
    }, () => {
      DialogManager.show({
          title: "Rezervasyon : "+this.state.buttons[selectedIndexes[selectedIndexes.length-1]],
          dialogStyle: {backgroundColor:'#cce6ff',
                        borderRadius:15},
          titleTextStyle: {fontSize:23,color:'#000'},
          titleAlign: 'center',
          animationDuration: 200,
          onDismissed: () => {
              this.setState({ meetingName:'', byName:''})
          },
          ScaleAnimation: new ScaleAnimation(),
          children: (
            <DialogContent>
              <KeyboardAvoidingView behavior='padding'>
                <TextInput
                                   style={styles.textInput} placeholder='Toplantı Başlığı'
                                   onChangeText={(meetingName) => this.setState({meetingName})}
                                   underlineColorAndroid='transparent'
                                   maxLength={24}
                                   onSubmitEditing={()=> this.byName.focus()}/>
                <TextInput
                                   style={styles.textInput} placeholder='Sorumlu Adı'
                                   onChangeText={(byName) => this.setState({byName})}
                                   underlineColorAndroid='transparent'
                                   maxLength={32}
                                   ref={(input) => this.byName=input}
                                   />
                <TouchableOpacity
                                     style={styles.btn}
                                     onPress={this.submitButtonReservation.bind(this)}>
                                    <Text style={styles.butonText}>GÖNDER</Text>
                </TouchableOpacity>

              </KeyboardAvoidingView>
            </DialogContent>
            ),
          }, () => {
            console.log('callback - show');
          });
      })
  }

  submitButtonReservation () {
    byName = this.state.byName
    meetingName = this.state.meetingName
    byNameList = this.state.byNameList
    meetingNames = this.state.meetingNames
    byNameList.push(byName)
    meetingNames.push(meetingName)
    this.setState({
      selectedHours:this.state.selectedHoursReplace,
      byNameList:byNameList,
      meetingNames:meetingNames
    }, ()=>{
      this.sortingMeetings()
      this.makeReservation()
      this.whileMeeting()

    })

    DialogManager.dismiss()

  }
  render() {
    var {navigate} = this.props.navigation
    const { selectedIndex }= this.state
    const selected=[2,3]
    const buttons=['9-9:30','9:30-10','10-10:30','10:30-11','11-11:30','11:30-12','12-12:30','12:30-13','13-13:30','13:30-14','14-14:30','14:30-15','15-15:30','15:30-16','16-16:30','16:30-17','17-17:30','17:30-18']
    return (
      <View style={styles.scroll}>


      <ImageBackground source={require('/home/linux-ozellik/Masaüstü/brrs/src/img/gray-bg.png')} style = {styles.container}>
      <View style={styles.status}>

      <View style={{flexDirection:'row', marginTop:20}}>
      <Text style={{fontSize:32, color:'red', marginLeft:20}}> | </Text>
      <Text style={{fontSize:32, color:'#fff'}}> {this.state.meetingRoomName}  </Text>
      <Text style={{fontSize:52, color:'#fff'}}> {this.getTime()} </Text>
      </View>
      <View style={[styles.isAvailable, {borderColor:this.state.statusColor}]}>


      <View style={{flexDirection:'column', flex:0.7}}>
        <Text style={{fontSize:64, color:this.state.statusColor}}>{this.state.status}</Text>
        <View style={{marginLeft:20, flexDirection:'column'}}>
        <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
        <Text style={{color:'#fff', fontSize:20}}>{this.getCurrentMeetingName()}</Text>
        <Text style={{fontSize:12, marginLeft:20, color:'#fff'}}>{this.getCurrentMeetingByName()} </Text>
        </View>
        <View style={{marginLeft:15,borderWidth:0.5, borderColor:'#fff', borderRadius:10}}>
        <Text style={{color:'#fff', fontSize: 30}}>{this.state.current} </Text>
        </View>
        </View>

        </View>
        </View>
        <View style={{marginLeft:0, flex:0.3}}>
        <Progress.Circle  size={150} thickness={5} color={this.state.statusColor} endAngle={0.6} showsText={true} progress={this.state.percent} unfilledColor={'rgb(121, 119, 119)'}/>
        </View>

        </View>

<Text style={{color:'#fff', alignItems:'flex-end', marginTop:2, marginLeft:3}}> {this.getNextMeetingName()} {this.getNextMeeting()}</Text>


      </View>

      <View style={styles.res}>

        <ButtonGroup
          buttons={buttons}
          containerStyle={{height:32}}
          textStyle={{fontSize:8, color:'#fff'}}
          selectMultiple
          selectedIndexes={this.state.selectedHours}
          selectedIndex={this.state.clickedIndex}
          selectedButtonStyle={{backgroundColor:'red'}}
          multi-selection={true}
          buttonStyle={{backgroundColor:'green'}}
          onPress={this.updateHour}
          />
          <View style={{flexDirection:'row', flex:1}}>
          <Button title="YÖNET"
          icon={{
            name: 'settings',
            size:25,
            color:'#fff'
          }}
          onPress={
            () => {this.getHoursForToday()}
          }
          buttonStyle={{justifyContent:'center', backgroundColor:'#d3d3d3', width:200, marginRight:10, marginTop:5}}
          />
          <Button title="GÜNLÜK"
          icon={{
            name:'update',
            size:25,
            color:'#fff'
          }}
          onPress={
            () => navigate("daily")
          }
          buttonStyle={{justifyContent:'center', backgroundColor:'#47a1de', width:200, marginRight:10, marginTop:5}}
          />
          <Button title="YER AYIR"
          icon={{
            name: 'date-range',
            size:25,
            color:'#fff'
          }}
          onPress={
              ()=>navigate("status")
          }
          buttonStyle={{justifyContent:'center', backgroundColor:'#feba02', width:200, marginTop:5}}
          />


           </View>

      </View>

      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'column',
    flex: 0.75,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth:0.5,
    borderColor:'#fff',
    borderRadius: 15,
  },
  isAvailable: {
    width:600,
    height:160,
    borderRadius:20,
    //backgroundColor:'red',
    flexDirection:'row',
    alignItems: 'center',
    borderWidth:1,
    //borderColor:'red',
    marginTop:0,
    marginLeft:25,
  },
  res: {
    flexDirection: 'column',
    flex: 0.25,
    alignItems: 'center',
    //justifyContent: 'center',
    borderRadius:15,
    borderColor:'#fff'
  },
  textInput:{
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius:25,
        borderWidth:0.5,
        borderColor:'green'
    },
    btn:{
        height: 40,
        alignSelf:'stretch',
        backgroundColor:'blue',
        padding:10,
        alignItems:'center',
        borderRadius:25,
        },
    butonText:{
        fontSize:16,
        fontWeight:'bold',
        textAlign:'center',
        color:'#fff'
    },
  scroll:  {
    flex:1,
  },
  container: {
    flex:1,
    width:null
  },
});
