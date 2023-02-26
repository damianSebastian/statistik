import React, { useState } from 'react';
import { Button } from '@mui/material';
import '../Login.css';

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant='contained' type='submit'>Login</Button>
      </form>
    </div>
  );
};

export default Login;
