import React, { useContext } from 'react';
import classes from './Style.module.css';
import UserContext from '../../context/UserContext/UserContext';

const Header = ({setShowLogin}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext
  return (
    <div className={classes.header}>
        <h2>Job Application Portal</h2>
        <div>
          {user ?
            <h2>Welcome, {user.name}</h2>
            :
            <button className={classes.loginButton} onClick={() => setShowLogin(true)}>LONGIN</button>
          }
        </div>
        
    </div>
  )
}

export default Header
