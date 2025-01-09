import React from 'react';
import classes from './Style.module.css';

const Header = ({user, setShowLogin}) => {
  
  return (
    <div className={classes.header}>
        <h2>Job Application Portal</h2>
        {user ?
          <h2>Welcome, {user.name}</h2>
          :
          <button onClick={() => setShowLogin(true)}>Log In</button>
        }
        
    </div>
  )
}

export default Header
