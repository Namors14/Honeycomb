import React, { Component } from 'react';
import { Link, Redirect, ReactDOM } from 'react-router-dom';
import { Form, Calendar, Alert, message, Spin } from 'antd';
import { Layout, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { userService } from '../services';
import { userActions } from '../actions';
import { history } from '../helpers';


const FormItem = Form.Item;
import moment from 'moment';


class Calendars extends Component {

  state = {
    value: moment(Date.now.Date),
    selectedValue: '--/--/--',
    Loading: true
  }

  // componentDidMount()
  // {
  //   this.getInfo();
  // }

  // getInfo =() =>
  //   {
  //     const qwt = JSON.parse(localStorage.getItem('token')).token;

  //     $.ajax({
  //         type: "POST", 
  //         url: '/api/Info/GetUserDate', 
  //         beforeSend: function (xhr) {   
  //             xhr.setRequestHeader("Authorization", 'Bearer '+ qwt);
  //         },
  //         success: data => {
  //           this.setState({selectedValue : data.date});
  //           this.setState({Loading : false});
  //         }
  //       });
  //     } 

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  onSelect = (value) => {
    this.setState({
      value, selectedValue : value.format('YYYY-MM-DD')
    });
     
    const date_ =
    {
      date : value.format('YYYY-MM-DD')
    };

    // $.ajax({
    //       type: "POST", 
    //       url: '/api/Info/SetUserDate', 
    //       data: JSON.stringify(date_),
    //       dataType: "json",
    //       contentType: "application/json; charset=utf-8",
    //       beforeSend: function (xhr) {   
    //         xhr.setRequestHeader("Authorization", 'Bearer '+ qwt);
    //       }
    //   });

    //   message.success('Your date study beginning has been changed', 5);
  }
  onPanelChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value, selectedValue } = this.state;
    
    return (
      <div>
         <Alert message={`You selected date: ${selectedValue}`} />
         <Calendar value={value} disabledDate={this.disabledDate} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
    </div>
  );
}
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedCalendar = connect(mapStateToProps)(Calendars);
export { connectedCalendar as Calendars};
// export default PrivateLayout