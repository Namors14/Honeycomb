import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';

import { Row, Col, Spin, List} from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Card} from 'antd';
import moment from 'moment';

import { userActions } from '../actions';
import { history } from '../helpers';


class Profile extends Component {

        state = {

          };

      render() {
        const {user} = this.props; 
        const data = [
          {title: 'Full name', content: user.details},
          {title: 'User name', content: user.name},
          {title: 'Email', content: user.email},
          {title: 'Address', content: user.address},
          {title: 'City', content: user.city},
          {title: 'Country', content: user.country},
          {title: 'Date of study', content: !user.studyDate ? "--/--/--" : user.studyDate}
        ]
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
          <Layout className="profile-layout">
            <Row>
              <Col xs={{ span: 0 }} md = {{ span : 7 }} lg={{ span: 7 }} className = "profile-picture">
              <Card 
                  
                  hoverable
                  cover={<img src="http://icons.iconarchive.com/icons/icons-land/vista-people/256/Person-Male-Light-icon.png" />}
                  >
                  </Card>
              </Col>
              <Col xs={{ span: 0 }} md = {{ span : 2 }} lg={{ span: 2 }}></Col>
              <Col xs={{ span: 24 }} md = {{ span : 15 }} lg={{ span: 15 }} className="user-info"> 
              <div >
                  <List
                  bordered
                  dataSource={data}
                  renderItem={item => (
                  <List.Item>
                    <pre className="profile-list-item"><b>{item.title} :  </b>{item.content} </pre>
                  </List.Item>)}
                  />
                </div>
              </Col>
            </Row>
          </Layout>
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