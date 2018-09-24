import React from 'react'
import { Text, View, ScrollView} from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import moment from 'moment'


export default class daily extends React.Component {
  constructor(props){
    super(props);
      this.state={
        buttons:['09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00','18:00-18:30'],
        selectedHours:[],
        meetingNames:[],
        byNames:[]
    }
  }
//{this.state.buttons[u] +"   " +this.state.meetingNames[i]+"   "+this.state.byNames[i]}
  static navigationOptions = {
    title: "GÜNLÜK TOPLANTILAR"
  }
  getHoursForToday = () => {
    let tarih = moment().format('YYYY-M-D')
    let selectedHoursReplace=[]
    let meetingNamesReplace=[]
    let byNamesReplace=[]
    console.log("get meeting name")
    let value=('http://10.77.2.206:3000/getRoomInfoDaily/1/'+tarih)
    fetch(value)
    .then((response)=>response.json())
    .then((responseJson)=>{
      for ( let i=0; i<responseJson.roomInfo.length; i++){
        console.log(responseJson.roomInfo[i].bookedby)
        selectedHoursReplace.push(responseJson.roomInfo[i].hourindex)
        meetingNamesReplace.push(responseJson.roomInfo[i].title)
        byNamesReplace.push(responseJson.roomInfo[i].bookedby)
        this.setState({
          selectedHours:selectedHoursReplace,
          meetingNames:meetingNamesReplace,
          byNames:byNamesReplace,
        })
      }


    })
    .catch((error) => {
      alert(error)
    })
  }
  componentDidMount(){
    {this.getHoursForToday()}
  }
  render(){
    return(
      <ScrollView>
      <Card title="GÖKTÜRK TOPLANTI ODASI">
  {
    this.state.selectedHours.map((u, i) => {
      return (
        <View key={i} style={{flexDirection:'row', borderWidth:0.5, borderColor:'#000', marginBottom:4, height:25, borderRadius:5, alignItems:'center'}}>

          <Text>{this.state.buttons[u]}</Text>

          <Text style={{marginLeft:150}}>{this.state.meetingNames[i]}</Text>

          <Text style={{position:'absolute', right:0}}>{this.state.byNames[i]}</Text>
        </View>
      );
    })

  }
</Card>
      </ScrollView>
    )
  }
}
