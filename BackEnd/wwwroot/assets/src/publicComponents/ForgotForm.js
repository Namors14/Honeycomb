import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import PropTypes from 'prop-types'
import axios from 'axios';

class NormalForgotForm extends React.Component {

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
      return <Redirect to='/recovery-password' />
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        const forgot = {
          Email: values.userEmail
        };
        console.log(forgot);
        axios.post(`/api/Account/ForgotPassword`, forgot)
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
        }).
        catch(error => {
          console.log(error.message);
          console.log(1);
        }

        );
      }
    });
  }

    render() {
      const { getFieldDecorator } = this.props.form;
      const Errors = this.state.errors.map(error => <li>{error}</li>)
      const Alert = this.state.errors.length == 0 ? "": <FormItem className="form-error"><div className="display-error">
      <ul className="ul-error">{Errors}</ul>
      </div></FormItem>
      
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
        {Alert}
         <FormItem>
            {getFieldDecorator('userEmail', {
              rules: [{ required: true, message: 'Please input your email!' },
              { type: 'email', message: 'The input is not valid E-mail!'},],
            })(
              <Input className='input-style' size='large' prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="Email" />
            )}
          </FormItem>
          <FormItem className='form-actions-forgot'>
          <Button size='large ' type="primary" htmlType="submit" className="back-form-button">
          <Link to='/' className='link-back'>Back</Link>
          </Button>
          {this.renderRedirect()}
          <Button size='large ' type="primary" htmlType="submit" className="forgot-form-button">
              SUBMIT
          </Button>
          </FormItem>
        </Form>
      );
    }
  }

  const ForgotForm = Form.create()(NormalForgotForm);

  export default ForgotForm