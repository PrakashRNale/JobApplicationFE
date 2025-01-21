import React from 'react';
import './Style.css';
import Login from '../Login/Login';

const LoginDropdown = () => {
  return (
    <div className="login-dropdown">
      <button className="login-button">Login</button>
      <div className="login-dropdown-content">
        <Login />
      </div>
    </div>
  );
};

export default LoginDropdown;
