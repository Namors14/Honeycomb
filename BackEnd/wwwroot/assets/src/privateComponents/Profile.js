import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';

import { Row, Col, Spin, List } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


import { userActions } from '../actions';
import { history } from '../helpers';


class Profile extends Component {

        state = {

          };

      render() {
        const {user} = this.props; 
        const data = [
          user.details,
          user.name,
          user.address,
          user.city,
          user.country
        ]
        console.log(user);
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
          <div style={{textAlign: 'center'}}>
            <List
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
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

const connectedProfile = connect(mapStateToProps)(Profile);
export { connectedProfile as Profile};
// export default PrivateLayout