import React, { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate()
  
    const handleLogin = () => {
      // Implement your login logic here
    //   navigate('/login')
      console.log('Registration clicked with:', {email, password});
    };

  return (
    <div className="App">
      <div className="login-container">
        <h2>Login</h2>
        <form>

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
          <div class="text-center">
              <span></span> <Link to='/forgot_pass'>Forgot Password</Link>
          </div>

          <button className='btn btn-primary' type="button" onClick={handleLogin}>
            Login
          </button>

          <div class="text-center">
              <span>Create Account?</span> <Link to='/signup'>New User</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login