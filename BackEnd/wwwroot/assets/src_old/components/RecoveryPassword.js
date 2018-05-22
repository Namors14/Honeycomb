import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import baseUrl from './ProjectConfig';
import PropTypes from 'prop-types'

class RecoveryPassword extends React.Component {

  handle = () => {
    const query = new URLSearchParams(this.props.location.search);
    const value = query.get('success');
    const userId = query.get('userId');
    const code = query.get('code');
    console.log(value);
    console.log(userId);
    console.log(code);
    if(value === "true") {
        return (
          <div className="form-login form-forget">
        <div>
          <h3 className="form-title">Reset Password Confirmation.</h3>
          <p className='text'>Your password has been reset. Please <Link to='/' className='link-registr'>Click here</Link> to go to the log in page !!!</p>
        </div>
      </div>
        )
      } else {
        return (
          <div className="form-login form-forget">
        <div>
        <h3 className="form-title">Forgot Password Confirmation.</h3>
        <p className='text'>Please check your email to reset your password.</p>
        </div>
      </div>
        )
      }
    }
  

    render() {
     const b =  this.handle()
      return(
        <main>
        {b}
        </main>
      )
    }
  }

  export default RecoveryPassword