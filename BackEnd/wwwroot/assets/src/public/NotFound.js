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
                <Col className="errors404" xs={{span: 24,  offset: 0}} sm={{span: 24,  offset: 0}} md={{span: 24,  offset: 0}} lg={{span: 24,  offset: 0}} xl={{span: 24,  offset: 0}}>
                    <div className="error404">Error 404. Page Not Found.</div>
                </Col>
            </Row>
                
        </Layout>
        );
    }
}
export default PublicLayout