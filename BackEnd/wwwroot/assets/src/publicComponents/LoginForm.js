import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


  class NormalLoginForm extends React.Component {

    state = {
      errors: ""
    }

    loginFacebook =()=> {
      console.log(1);
      axios.post(`/api/Account/FacebookLogin`).then(res => {
        if(res.data == "Success")
        {

        } else {
          this.setState({errors: res.data})
        }
        
        console.log(res.data);
      }).catch(error =>{
        console.log(error.message);
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
        if (!err) {
          const logindata = {
            UserName: values.userName,
            Password: values.password
          };
          axios.post(`/api/Account/Login`, logindata)
          .then(res => {
            if(res.data == "Success")
            {

            } else {
              this.setState({errors: res.data})
            }
            
            console.log(res.data);
          });
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const Alert = this.state.errors.length == 0 ? "": <FormItem className="form-error-login"><div className="display-error">
      <ul className="ul-error">{this.state.errors}</ul>
      </div></FormItem>

      return (
        <Form onSubmit={this.handleSubmit} className="login-form">

        {Alert}
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input className='input-style' size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }]
            })(
              <Input className='input-style' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem className='form-actions'>
            <Button size='large ' type="primary"  htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
              className: 'remember-password'
            })(
              <Checkbox>Remember</Checkbox>
            )}
            <Link to='/forgot' className = 'login-form-forgot'>Forgot password?</Link>
          </FormItem>
          <FormItem className='form-social'>
           <Button type="primary" icon="facebook" size='large' href='/api/Account/FacebookLogin?provider=Facebook'>
          Sign In with Facebook
          </Button>
          </FormItem>
          <FormItem className='register-form'>
            <Link to='/register' className='uppercase link-registr'>Create an account</Link>
          </FormItem>
        </Form>
      );
    }
  }

  const LoginForm = Form.create()(NormalLoginForm);

  export default LoginForm