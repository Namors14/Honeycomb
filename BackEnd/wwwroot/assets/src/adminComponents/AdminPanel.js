import React, { Component } from 'react';
import { Link,  Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userService } from '../services';
import { authHeader, config } from '../helpers';
import axios from 'axios';
import { Pagination } from 'antd';
import { Input } from 'antd';
const Search = Input.Search;

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
            pagination: {defaultPageSize:10, showSizeChanger:true, pageSizeOptions: ['2', '5', '10', '20']},
            loading: false,
            field: "name",
            order: "ascend",
            filter: null,
        };
    }

    handleTableChange = (pagination, filters, sorter) => {
        let fields;
        let orders;
        if(sorter.field) {
          this.setState({ field: sorter.field,
                          order: sorter.order
          });
          fields = sorter.field;
          orders = sorter.order;
        } else {
          fields = this.state.field;
          orders = this.state.order;
        }
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;

        this.GetUsers({
          results: pagination.pageSize,
          page: pagination.current,
          field: fields,
          order: orders,
          filter: this.state.filter
        });
      }

      GetUsers = (params = {}) => {
        this.setState({ loading: true });
        const data= {
                ...params,
              }
        console.log(this.state)
        axios.post(`/api/Admin/GetUsers`, data , { headers: authHeader() })
        .then(users => {
            const pagination = { ...this.state.pagination };
            pagination.total = users.data.all;
            console.log(users.data);
            this.setState({
                loading: false,
                data: users.data.users,
                pagination
            });
        });
      }
      searchByName = (value) => {
        this.setState({
         filter: value
      });
      const pagination = { ...this.state.pagination };
      this.GetUsers({
          results: pagination.defaultPageSize,
          page: 1,
          field: this.state.field,
          order: this.state.orderr,
          filter: value
      });
      }
      componentDidMount() {
        
        this.GetUsers({
            results: 10,
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
        }, {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: true,
        }, {
          title: 'Details',
          dataIndex: 'details',
          key: 'details',
          sorter: true,
        }, {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
          sorter: true,
        }, {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          sorter: true,
        }, {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          sorter: true,
        }, {
          title: 'Start Study',
          dataIndex: 'startstudy',
          key: 'startstudy',
          sorter: true,
        }];
        if(false) { 
          return (<div className="example"><Spin /></div>)
        }
        return(
          <div>
          <div>
            <Search
             placeholder="input search text"
            onSearch={value => this.searchByName(value)}
            style={{ width: 150 }}
            />
          </div>
            <div>
                <Table columns={columns}
                rowKey={record => record.registered}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                />
            </div>
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