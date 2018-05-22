import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot'
import ConfirmEmail from './ConfirmEmail'
import RecoveryPassword from './RecoveryPassword'
import { BrowserRouter } from 'react-router-dom'
import RecoveryForm from './RecoveryForm';
import Privacy from './Privacy';

  const Main = () => (
    <Switch>
      <Route title='Login' exact path='/' component={Login}/>
      <Route title='Login' path='/login' component={Login}/>
      <Route title='Register' path='/register' component={Register}/>
      <Route title='Forgot password' path='/forgot' component={Forgot}/>
      <Route title='Recovery password' path='/recovery-password' component={RecoveryPassword}/>
      <Route title='Confirmation email' path='/email-confirm' component={ConfirmEmail}/>
      <Route title='Reset password' path='/reset-password' component={RecoveryForm}/>
      <Route title='Reset password' path='/privacy' component={Privacy}/>
    </Switch>
  )
    
  export default Main