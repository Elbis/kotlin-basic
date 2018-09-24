import React, { Component } from 'react';
import logo from './img/sefamerve2.png';
import './App.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/tr'
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import ReactDataGrid from 'react-data-grid';
class App extends Component {
  constructor(props){
    super(props)
    this.createRows();
    this._columns = [
      { key: 'id', name: 'SAAT' },
      { key: 'title', name: 'TOPLANTI ADI' },
      { key: 'count', name: 'SORUMLU ADI' } ];
    this.state={
      meetingRooms:['GÖKTÜRK TOPLANTI ODASI',"TEST TOPLANTI ODASI"],
      startDate: moment(),
      time: moment(),
      buttons:['09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00'],

    }
    this.handleChange = this.handleChange.bind(this);
  }
  createRows = () => {
    let buttons=['09:00-09:30','09:30-10:00','10:00-10:30','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00'];

    let rows = [];
    for (let i = 0; i < buttons.length; i++) {
      rows.push({
        id: buttons[i],
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;
  };
  rowGetter = (i) => {
    return this._rows[i];
  };


  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">SEFAMERVE TOPLANTI YÖNETİM SİSTEMİ</h1>
        </header>
        <div className="App-intro">
        <div className="topSelectableItems">
        <label className="tarihLABEL">TARİH: </label>
        <DatePicker
        locale="tr"

      selected={this.state.startDate}
      onChange={this.handleChange}
      minDate={moment()}
      dateFormat="YYYY-M-D"
      todayButton={"BUGÜN"}
      placeHolderText="Lütfen bir tarih seçiniz"
  />
  <label className="toplantiLABEL">TOPLANTI ODASI: </label>
  <div className="meetingRoom">
  <Dropdown
 options={this.state.meetingRooms}
 onChange={this._onSelect}
 value={this.state.meetingRooms[0]}
 block = {true}
 placeholder="Select an option" />
  </div>
  </div>
        <ReactDataGrid
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this._rows.length}
        minHeight={300}

        />
        </div>
      </div>
    );
  }
}

export default App;
