import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

class ConfirmEmail extends React.Component {

  handle = () => {

    const query = new URLSearchParams(this.props.route.location.search);
    const value = query.get('success');

    if(value === "true") {
      return (
        <div className="form-login form-forget">
      <div>
        <h3 className="form-title">Get started!</h3>
        <p className='text'>Your email has been successfully confirmed. Please <Link to='/' className='link-registr'>Click here</Link> to go to the log in page !!!</p>
      </div>
    </div>
      )
    } else {
      return (
        <div className="form-login form-forget">
      <div>
        <h3 className="form-title">Get started!</h3>
        <p className='text'>Thank you for registering. At the e-mail specified by you, a letter with instructions for confirmation was sent.</p>
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



  export default ConfirmEmail