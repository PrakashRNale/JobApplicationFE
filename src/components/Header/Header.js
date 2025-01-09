import React, { useState, useContext } from 'react';
import classes from './Style.module.css';
import UserContext from '../../context/UserContext/UserContext';
import LoginDropdown from '../LoginDropdown/LoginDropdown';
import Modal from '../Modal/Modal';

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
        <Modal isOpen={isModalOpen} onClose={closeModal} title="What Problem we are fixing">
        <p className={classes.aboutApplication} >While applying for jobs we all are facing one problem. Consider we sent any job application email to HR after 6 PM. Then HR will not see our email until next day he/she logs into their laptop. By that time our email will not be at the top. There will be lot of emails in front of HR. 
So solution is we can send email around 10AM in the morning only so that HR can see our mail as it will be at the top in the inbox. 
Again problem is we can not send email to 100 HRs at the same time. Also if we are trying for companies in other timezone then we have to send mail when that companies HR will be logged in.
So this application will solve this problem. Here we can just provide the details including HR Name, HR email and mention the time at which we need to send this mail. This application will send email at mentioned time.
Also we can keep track of our applications that we have sent earlier.</p>
        <button onClick={closeModal}>Close Modal</button>
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
