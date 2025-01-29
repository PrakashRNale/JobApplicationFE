import React from 'react';
import './Style.css';
import Login from '../Login/Login';

const LoginDropdown = () => {
  const handleRedirectLogin = () => {
      console.log(process.env.REACT_APP_API_ENDPOINT+'/auth/google');
      window.location.href = process.env.REACT_APP_API_ENDPOINT+'/auth/google'; // Redirect to your backend
  };
  return (
    <div className="login-dropdown">
      <button className="login-button" onClick={handleRedirectLogin}>
          Sign in with Google
      </button>
    </div>
  );
};

export default LoginDropdown;
