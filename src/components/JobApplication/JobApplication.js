import React, { useContext, useState } from 'react'
import NewJobApplication from '../NewJobApplication/NewJobApplication'
import AppliedCompanies from '../AppliedCompanies/AppliedCompanies';
import classes from './Style.module.css';
import UserContext from '../../context/UserContext/UserContext';
import Notification from '../Notification/Notificaiton';


const JobApplication = () => {
  const [tab, setTab] = useState(0);
  const userContext = useContext(UserContext);

  return (
    <div className={classes.mainContainer}>
        {!userContext.user &&
          <Notification text="If you are not logged in then you will see only dummy data" />
        }
       
        <div className={classes.tabsContainer}>
            <div onClick={() =>{setTab(0)}} className={`${classes.tab} ${tab === 0 ? classes.active : ''}` } >New Job</div>
            <div onClick={() =>{setTab(1)}}  className={`${classes.tab} ${tab === 1 ? classes.active : ''}` }>Existing Applications</div>
        </div>
        {
            tab === 0 ?
            <NewJobApplication />
            :
            <AppliedCompanies />
        }
    
    </div>
  )
}

export default JobApplication
