import React from 'react'
import { Link } from 'react-router-dom'
import ForgotForm from './ForgotForm'

  const Forgot = () => (
    <div className="form-login form-forget">
      <div>
        <h3 className="form-title">Forget password?</h3>
        <p className='text'>Enter your e-mail address below to reset your password.</p>
      </div>
      <ForgotForm />
    </div>
  )
  
  export default Forgot