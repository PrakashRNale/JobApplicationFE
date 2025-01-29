import React, { useState, useContext } from 'react';
import classes from './Style.module.css';
import UserContext from '../../context/UserContext/UserContext';
import LoginDropdown from '../LoginDropdown/LoginDropdown';
import Modal from '../Modal/Modal';
import ApplicationUseCase from '../ApplicationUseCase/ApplicationUseCase';

const Header = ({setShowLogin}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext
  const [isModalOpen, setIsModalOpen] = useState(userContext?.user ? false : true); // if user is logged in then that means user is already aware of the applicaiton. So no need to show him agian same content

  const closeModal = () =>{
    setIsModalOpen(false);
  }

  return (
    <div className={classes.header}>
        <h2>Job Application Portal</h2>
        <h3 className={classes.openModal} onClick={() => setIsModalOpen(true)}>What we are helping</h3>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Job Application Email Scheduler">
          <ApplicationUseCase />
          <button className={classes.applicationButton} onClick={closeModal}>
            Get Started Now
          </button>
        </Modal>
        <div>
          {user ?
            <h2>Welcome, {user.name}</h2>
            :
            <LoginDropdown setShowLogin={setShowLogin} />
          }
        </div>
    </div>
  )
}

export default Header
