import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import axios from 'axios';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { userActions } from '../actions';

const FormItem = Form.Item;


  class NormalLogin extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
          error: "",
          username: '',
          password: ''
      };
  }


    loginFacebook =()=> {
      console.log(1);
      axios.post(`/api/Account/FacebookLogin`).then(res => {
        if(res.data == "Success")
        {

        } else {
          this.setState({error: res.data})
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
          const { dispatch } = this.props;
            if (values.userName && values.password) {
              dispatch(userActions.login(values.userName, values.password));
              // .then(
              //   user => {
              //     this.setState({error: user.error})
              //   }
              // );
          } 
        }
      });
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const Alert = this.state.error.length == 0 ? "": <FormItem className="form-error-login"><div className="display-error">
      <ul className="ul-error">{this.state.error}</ul>
      </div></FormItem>
      return (
        <div className="form-login">
    <div>
      <h3 className="form-title">Sign In</h3>
    </div>
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
        </div>
      );
    }
  }

  const Login = Form.create()(NormalLogin);

  function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

  const connectedLoginPage = connect(mapStateToProps)(Login);

  export { connectedLoginPage as Login }; 

  // export default LoginForm