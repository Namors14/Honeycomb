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

  componentDidMount()
  {
    this.setState({selectedValue : this.props.user.studyDate});
    if(this.props.user.studyDate){
      this.setState({value : moment(this.props.user.studyDate)});
    }
  }

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  onSelect = (value) => {
    this.setState({
      value, selectedValue : value.format('YYYY-MM-DD')
    });
     
    const date = value.format('YYYY-MM-DD')
    console.log(this.props.user.name)
    const { dispatch } = this.props;
    dispatch(userActions.SetDate(this.props.user.name, date));

      message.success('Your date study beginning has been changed', 5);
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