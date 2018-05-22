import React from 'react'
import { Link } from 'react-router-dom';

import logo_img from '../logo.png'

  const Header = () => (
    <div className='logo'>
      <Link to='/'><img src={logo_img}/></Link>
    </div>
  )
    
  export default Header