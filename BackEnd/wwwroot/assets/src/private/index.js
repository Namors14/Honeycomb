import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';

import { Row, Col, Spin } from 'antd';
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



      render() {
        const { user } = this.props;
        const Component = this.props.component;
        const route = this.props.route;
        const menuSelected = location.pathname;
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
                        <div className="menu">
                        <Menu mode="inline" defaultSelectedKeys={[menuSelected]}>
                        <Menu.Item  key="/profile">
                        <Link to="/profile"><Icon type="user" />
                        <span>Profile</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/calendar">
                        <Link to="/calendar"><Icon type="calendar" />
                        <span>Calendar</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/settings">
                        <Link to="/settings"><Icon type="setting" />
                        <span>Settings</span></Link>
                        </Menu.Item>
                        </Menu>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#2b3643', height: 50}}>
                            <div className="header-icons">
                            <span className="exit username">{user.name}</span>
                            <span className="logout">
                                <Icon
                                className="exit"
                                type='logout'
                                onClick={this.exit}/>
                            </span>
                            </div>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
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

function mapStateToProps(state) {
    const { authentication } = state;
    const  user  = authentication.user;
    return {
        user
    };
}

const connectedPrivateLayout = connect(mapStateToProps)(PrivateLayout);
export { connectedPrivateLayout as PrivateLayout};
// export default PrivateLayout