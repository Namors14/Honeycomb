import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import PropTypes from 'prop-types'
import axios from 'axios';

class NormalRecoveryForm extends React.Component {

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
      return <Redirect to='/recovery-password?success=true' />
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(1);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(2);
        const query = new URLSearchParams(this.props.route.location.search);

        const userId = query.get('userId');
        const code = query.get('code');
        console.log(values);
        const recovery = {
          Id: userId,
          Password: values.password,
          ConfirmPassword: values.password,
          Code: code
        };
        console.log(recovery);
        axios.post(`/api/Account/ResetPassword`, recovery)
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

    render() {
      const { getFieldDecorator } = this.props.form;
      const Errors = this.state.errors.map(error => <li>{error}</li>)
      const Alert = this.state.errors.length == 0 ? "": <FormItem className="form-error"><div className="display-error">
      <ul className="ul-error">{Errors}</ul>
      </div></FormItem>
      return (
        <div className="form-login form-forget">
            <div>
              <h3 className="form-title">Reset Password</h3>
            </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
        {Alert}
         
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
              <Input  className='input-style' size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Re-type Your Password" />
            )}
          </FormItem>
          <FormItem className='form-actions-forgot'>
          {this.renderRedirect()}
          <Button size='large ' type="primary" htmlType="submit" className="forgot-form-button">
              SUBMIT
          </Button>
          </FormItem>
        </Form>
        </div>
      );
    }
  }

  const RecoveryForm = Form.create()(NormalRecoveryForm);

  export default RecoveryForm