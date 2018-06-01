import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';
import { authHeader, config } from '../helpers';
import axios from 'axios';
import { Pagination } from 'antd';

import { Row, Col, Spin } from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Table } from 'antd';
import {  Divider } from 'antd';


import { userActions } from '../actions';
import { history } from '../helpers';



class AdminPanel extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            data: [],
            pagination: {defaultPageSize:2, showSizeChanger:true, pageSizeOptions: ['2', '5', '10', '20']},
            loading: false,
            sortedInfo: null,
            field: "name",
            order: null,
            filter: null,
        };
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
        this.setState({
            sortedInfo: sorter,
        });
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        if(sorter.field) {
          this.setState({
            pagination: pager,
            field: sorter.field,
            order: null,
          });
        }
        
        this.GetUsers({
          results: pagination.pageSize,
          page: pagination.current,
          field: this.state.field,
          order: this.state.order,
          filter: this.state.filter
        });
      }

      GetUsers = (params = {}) => {
        this.setState({ loading: true });
        const data= {
                ...params,
              }
        console.log(data);
        axios.post(`/api/Admin/GetUsers`, data , { headers: authHeader() })
        .then(users => {
            const pagination = { ...this.state.pagination };
            pagination.total = users.data.all;
            console.log(users.data);
            this.setState({
                loading: false,
                data: users.data.users,
                pagination,
                sortedInfo: null,
            });
        });
      }
      componentDidMount() {
        this.GetUsers({
            results: 2,
            page: 1,
            field: this.state.field,
            order: this.state.order,
            filter: this.state.filter
          });
      }

    render() {
        const {user} = this.props;
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};

        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        }, {
          title: 'Details',
          dataIndex: 'details',
          key: 'details',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'details' && sortedInfo.order,
        }, {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
        }, {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
        }, {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        }, {
          title: 'Start Study',
          dataIndex: 'startstudy',
          key: 'startstudy',
          sorter: true,
          sortOrder: sortedInfo.columnKey === 'startstudy' && sortedInfo.order,
        }];
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
            <div>
                <Table columns={columns}
                rowKey={record => record.registered}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
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

const connectedAdminPanel = connect(mapStateToProps)(AdminPanel);
export { connectedAdminPanel as AdminPanel};