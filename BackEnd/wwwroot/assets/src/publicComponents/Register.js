import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'

export const Register = () => {
return (
  <div className="form-login form-forget">
    <div>
    <h3 className="form-title">Sign Up</h3>
    </div>
    <RegisterForm />
  </div>
)
} 