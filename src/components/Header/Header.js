import React, { useState, useContext, useEffect } from 'react';
import classes from './Style.module.css';
import UserContext from '../../context/UserContext/UserContext';
import Login from '../Login/Login';
import Modal from '../Modal/Modal';
import ApplicationUseCase from '../ApplicationUseCase/ApplicationUseCase';
import Logout from '../Logout/Logout';
import Loader from '../Loader/Loader';

const Header = ({setShowLogin}) => {
  const { user, loading, isLoggedOut } = useContext(UserContext);
  console.log("User " + JSON.stringify(user));
  const [showAboutApplication, setShowAboutApplication] = useState(false); 
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("firstVisit");

    if (!user && !loading && !isLoggedOut && !hasVisitedBefore) {
        console.log("Showing popup because this is the first visit");
        setShowAboutApplication(true);
        localStorage.setItem("firstVisit", "true");  // Save flag so it doesn’t show again
    }
}, [user, loading, isLoggedOut]);


  const closeModal = () =>{
    setShowAboutApplication(false);
  }

  return (
    <div className={classes.header}>
        <h2>Job Application Portal</h2>
        <h3 className={classes.openModal} onClick={() => setShowAboutApplication(true)}>What we are helping</h3>
        <Loader />
        <Modal isOpen={showAboutApplication} onClose={closeModal} title="Job Application Email Scheduler">
          <ApplicationUseCase />
          <button className={classes.applicationButton} onClick={closeModal}>
            Get Started Now
          </button>
        </Modal>
        <div>
          {user ?
            <h2 className={classes.userName} onMouseEnter={() => setShowLogout(true)} onMouseLeave={() => setShowLogout(false)} >{user.name} 
              { showLogout && <Logout />}
            </h2>
            :
            <Login setShowLogin={setShowLogin} />
          }
        </div>
    </div>
  )
}

export default Header
