import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';

import { Row, Col, Spin } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


import { userActions } from '../actions';
import { history } from '../helpers';


class Settings extends Component {

        state = {

          };

      render() {
        const {user} = this.props; 
        console.log(user);
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
          <div style={{textAlign: 'center'}}>
            <h3 className="form-title">Settings</h3>
          </div>
        )
      }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { user } = authentication;
  return {
      user
  };
}

const connectedSettings = connect(mapStateToProps)(Settings);
export { connectedSettings as Settings};
// export default PrivateLayout