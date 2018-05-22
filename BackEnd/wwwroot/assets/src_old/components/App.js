import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { Layout, Row, Col } from 'antd';
import '../index.css';

    const App = () => (
        <Layout className='layout'>
            <Row>
                <Col className='header' xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col className="content" xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Main />
                </Col>
            </Row>
            <Row>
                <Col className="footer" xs={{span: 20,  offset: 2}} sm={{span: 16,  offset: 4}} md={{span: 12,  offset: 6}} lg={{span: 8,  offset: 8}} xl={{span: 8,  offset: 8}}>
                    <Footer />
                </Col>
            </Row>       
        </Layout>
    )

    export default App