import React, { useState } from 'react';
import './forgot_pass.scss';
import { Link, useNavigate } from 'react-router-dom';

const Forgot = () => {

    const [email, setEmail] = useState('');
    let navigate = useNavigate()
  
    const handleForgot = () => {
      // Implement your forgot logic here
    //   navigate('/login')
      console.log('Registration clicked with:', {email});
    };

  return (
    <div className="App">
      <div className="forgot-container">
        <h2>Forgot Password</h2>
        <form>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className='btn btn-primary' type="button" onClick={handleForgot}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default Forgot