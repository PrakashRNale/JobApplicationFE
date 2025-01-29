import React, { useContext, useState } from 'react'
import classes from './style.module.css';
import UserContext from '../../context/UserContext/UserContext';
import ErrorPopup from '../ErrorMessage/ErrorMessage';
import { setUserInfo } from '../../api/user';
import MessagePopup from '../ErrorMessage/ErrorMessage';

const UserDetails = () => {

  const { user, setUserDetails } = useContext(UserContext);
  const [linkedinProfile, setLinkedinProfile] = useState(user.linkedinProfile || "" );
  const [githubProfile, setGithubProfile] = useState(user.githubProfile || "" );
  const [leetcodeProfile, setLeetcodeProfile] = useState(user.leetcodeProfile || "" );
  const [technologies, setTechnologies] = useState(user.technologies || "" );
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const submitUserDetails = async () =>{

    const userDetails = {
        ...(linkedinProfile ? { 'linkedinProfile': linkedinProfile } : {}),
        ...(githubProfile ? { 'githubProfile': githubProfile } : {}),
        ...(leetcodeProfile ? { 'leetcodeProfile': leetcodeProfile } : {}),
        ...(technologies ? { 'technologies': technologies } : {}),

      };
      try {
        const resp = await setUserInfo(userDetails);

        const modifiedUser = {
          ...user,
          ...userDetails
        }

        setUserDetails(modifiedUser);
        setIsError(false);
        setMessage("User Modified Successfully")
      } catch (error) {
        setIsError(true)
        setMessage('user details setting failed');
      }


      debugger;
  }

  return (
    <div >
        <MessagePopup isError={isError}  message={message} onClose={() => setMessage("")} />
        <div className={classes.userDetails}>
            <input 
                type="text"
                placeholder="Enter Linkedin URL"
                value={linkedinProfile}
                name="linkedin"
                onChange={(e) => setLinkedinProfile(e.target.value)}  
            />
            <input 
                type="text"
                placeholder="Enter Github URL"
                value={githubProfile}
                name="github"
                onChange={(e) => setGithubProfile(e.target.value)}  
            />
            <input 
                type="text"
                placeholder="Enter Leetcode URL"
                value={leetcodeProfile}
                name="leetcode"
                onChange={(e) => setLeetcodeProfile(e.target.value)}  
            />
            <input 
                type="text"
                placeholder="Enter comma seperated Technologies"
                value={technologies}
                name="technologies"
                onChange={(e) => setTechnologies(e.target.value)}  
            />
        </div>
        <button onClick={submitUserDetails}>Submit</button>
    </div>
  )
}

export default UserDetails
