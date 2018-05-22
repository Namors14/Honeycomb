import React from 'react'

  const Footer = (props) => {
    let year = new Date().getFullYear().toString();

    return(
      <div className='copyright'>
        {year}  by R.Bolkun
      </div>
    )
  }
  
  export default Footer