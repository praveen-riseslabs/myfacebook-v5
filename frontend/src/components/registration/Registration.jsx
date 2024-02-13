import React, { useState } from 'react';
import './registration.scss';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate()
  
    const handleRegistration = () => {
      // Implement your registration logic here
      navigate('/')
      console.log('Registration clicked with:', { name, email, password, confirmPassword });
    };

  return (
    <div className="App">
      <div className="registration-container">
        <h2>Registration</h2>
        <form>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className='btn btn-primary' type="button" onClick={handleRegistration}>
            Register
          </button>

          <div class="text-center">
              <span>Already have a account?</span> <Link to='/'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration