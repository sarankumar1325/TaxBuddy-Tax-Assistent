import React from 'react';
import '../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="page login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          className="login-input"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="login-input"
          required 
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
