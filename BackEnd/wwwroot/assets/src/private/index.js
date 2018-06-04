import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
        const rend = (route.match.url=="/adminpanel" && !user.roles.some(x=>x=="admin"))?
        <Redirect to="/profile"/>:<Component route={route}/>;
        const menuSelected = location.pathname;
        const adminCabinet = (user && user.roles.some(x=>x=="admin") )? (
        <Menu.Item key="/adminpanel">
        <Link to="/adminpanel" ><Icon type="idcard" className="menu-item" />
        <span className="menu-item">Admin Panel</span></Link>
        </Menu.Item>) : "";
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
                        {adminCabinet}
                        <Menu.Item  key="/profile">
                        <Link to="/profile"> <Icon type="user" className="menu-item" />
                        <span className="menu-item">Profile</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/calendar">
                        <Link to="/calendar"> <Icon type="calendar" className="menu-item" />
                        <span className="menu-item">Calendar</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/settings">
                        <Link to="/settings"> <Icon type="setting" className="menu-item" />
                        <span className="menu-item">Settings</span></Link>
                        </Menu.Item>
                        </Menu>
                        </div>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#2b3643', height: 50}}>
                            <div className="header-icons">
                            <span className="exit username">{user.name}</span>
                            <span className="logout">
                            <Link to="/">
                                <Icon
                                className="exit"
                                type='logout'
                                onClick={this.exit}/>
                            </Link>
                            </span>
                            </div>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
                            <div>
                                {rend}
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