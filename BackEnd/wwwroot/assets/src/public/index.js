import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import Header from './Header';
import Footer from './Footer';


class PublicLayout extends Component {

    render() {
        const Component = this.props.component;
        const route = this.props.route;
        return (
            <Layout className='layout'>
            <Row>
                <Col className='header' xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col className="content" xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Component route={route}/>
                </Col>
            </Row>
            <Row>
                <Col className="footer" xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Footer />
                </Col>
            </Row>       
        </Layout>
        );
    }
}
export default PublicLayout