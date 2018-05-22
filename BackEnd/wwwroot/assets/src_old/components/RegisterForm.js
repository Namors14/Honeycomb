import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Select } from 'antd';
import CountryAPI from './CountryAPI';
import baseUrl from './ProjectConfig';
import PropTypes from 'prop-types'
const Option = Select.Option;
const FormItem = Form.Item;
 

  class NormalRegisterForm extends React.Component {

    state = {
      errors: [],
      redirect: false
    }

    static contextTypes = {
      router: PropTypes.object
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        console.log(this.state.redirect);
        return <Redirect to='/email-confirm' />
      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      

      this.props.form.validateFields((err, values) => {
        if (!err) {

          const user = {
            Details: values.userDetails,
            Email: values.userEmail,
            Address: values.userAddress,
            City: values.userCity,
            Country: values.userCountry,
            UserName: values.userName,
            Password: values.password
          };
          axios.post(`${baseUrl}/api/Account/Register`, user)
          .then(res => {
            console.log(res.data.length);
            if(res.data.length == 0) {
              console.log("I'm here!");
              console.log(res.data);
              this.setRedirect();
            } else {
              console.log("No, I'm here!");
              this.setState({errors: res.data});
              console.log(res.data);
            }
          });
        }
      });
    }

    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }

    validateToSPP = (rule, value, callback) => {
      const form = this.props.form;
      if (!value) {
        callback('Please agree to the ToF and PP!');
      }
      callback();
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const countryOptions = CountryAPI.map(country => <Option className='country-option' key={country}>{country}</Option>);
      const Errors = this.state.errors.map(error => <li>{error}</li>)
      const Alert = this.state.errors.length == 0 ? "": <FormItem className="form-error"><div className="display-error">
      <ul className="ul-error">{Errors}</ul>
      </div></FormItem>
      return (
        
        <Form onSubmit={this.handleSubmit} className="login-form">

          {Alert}

          <FormItem className='account-details-top'>
            <p className='text'>Enter your personal details below:</p>
          </FormItem>
          <FormItem>
            {getFieldDecorator('userDetails', {
              rules: [{ required: true, message: 'Please input your name!' },
            ],
            })(
              <Input className='input-style' size='large' prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Full Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userEmail',   
            {
              rules: [
                { type: 'email', message: 'The input is not valid E-mail!'},
                { required: true, message: 'Please input your email!' }],
            })(
              <Input  className='input-style' size='large' prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userAddress', {
              rules: [{ required: true, message: 'Please input your address!' }],
            })(
              <Input  className='input-style' size='large' prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Address" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userCity', {
              rules: [{ required: true, message: 'Please input your city/town!' }],
            })(
              <Input  className='input-style' size='large' prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="City/Town" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userCountry', {
              rules: [{ required: true, message: 'Please select your country!' }],
            })(
              <Select   showSearch size='large' placeholder='Select Country' className='input-style'>
                {countryOptions}
              </Select>
            )}
          </FormItem>
          <FormItem className='account-details'>
            <p className='text'>Enter your account details below:</p>
          </FormItem>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input   className='input-style' size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' },
              {
                validator: this.validateToNextPassword
              }],
            })(
              <Input  className='input-style' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password-confirm', {
              rules: [{ required: true, message: 'Please re-type your password!' },
              {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input onBlur={this.handleConfirmBlur} className='input-style' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-type Your Password" />
            )}
          </FormItem>
          <FormItem className='agree-term'>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,     
              rules: [,
                { validator: this.validateToSPP,}
            ]         
            })(
              <Checkbox>I agree to the Terms of Service & Privacy Policy</Checkbox>
            )}
          </FormItem>
          <FormItem className='form-actions-forgot'>
            <Button size='large ' type="primary" htmlType="submit" className="back-form-button">
              <Link to='/' className='link-back'>Back</Link>
            </Button>
            {this.renderRedirect()}
          <Button size='large' type="primary" htmlType="submit" className="forgot-form-button">
            SUBMIT
          </Button>
          </FormItem>
        </Form>
      );
    }
  }

  const RegisterForm = Form.create()(NormalRegisterForm);

  export default RegisterForm