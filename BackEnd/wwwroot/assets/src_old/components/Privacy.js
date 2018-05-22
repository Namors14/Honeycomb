import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class Privacy extends React.Component {

  handle = () => {

    const query = new URLSearchParams(this.props.location.search);
    const value = query.get('success');


      return (
        <div className="form-login form-forget">
      <div>
        <h3 className="form-title">Get started!</h3>
        <a href="https:\\facebook.com">Privacy Term</a>
        <p className='text'>Your email has been successfully confirmed. Please <Link to='/' className='link-registr'>Click here</Link> to go to the log in page !!!</p>
      </div>
    </div>
      )
   
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



  export default Privacy