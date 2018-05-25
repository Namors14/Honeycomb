import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';

import { Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

import logo_img from '../logo.png'

import Headers from './Header';
import Footers from './Footer';

import { userActions } from '../actions';
import { history } from '../helpers';


class PrivateLayout extends Component {
  
        state = {
            collapsed: false,
            username: ""
          };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }

      exit = () => {
          userActions.logout();
          history.push('/');
      }
      GetUserInfo(){
           userService.GetUser().then(x=>{
           this.setState({
            username: x.userName,
          });
       })
      }
      componentDidMount() {
          this.GetUserInfo()
      }

      render() {
        const Component = this.props.component;
        const route = this.props.route;
        const divStyle = this.state.collapsed? {display: 'none'} : {display: 'inline'};
        return (
            <Layout className="layout">
                <Layout>
                    <Sider style={{background: '#333f4f'}}
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    >
                        <div className="side-trigger" style={{background: '#2b3643', height: 50}}>
                            <span style={divStyle}><Link to='/'><img src={logo_img}/></Link></span>
                            <span>
                                <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}/>
                            </span>
                        </div>
                        <div>
                            <Link to="settings">Settings</Link>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#2b3643', height: 50}}>
                            <div className="header-icons">
                            <span className="exit username">{this.state.username}</span>
                            <span className="logout">
                                <Icon
                                className="exit"
                                type='logout'
                                onClick={this.exit}/>
                            </span>
                            </div>
                        </Header>
                        <Content>
                            <div>
                            <Component route={route}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
                <Footer className="footer reg-footer">
                    <Footers />
                </Footer>
            </Layout>
        );
      }
}
export default PrivateLayout