import { useContext, useState } from 'react'; 

import classes from './Style.module.css';
import { applyJob } from '../../api/company'
import { FORMFIELDS } from '../../constants/formFields';
import { isValidForm } from '../../utils/validateForm';
import UserContext from '../../context/UserContext/UserContext';
import UserDetails from '../UserDetails/UserDetails';
import Modal from '../Modal/Modal';
import MessagePopup from '../ErrorMessage/ErrorMessage';

const NewJobApplication = () => {
    const { user, setUserDetails } = useContext(UserContext);
    // Generate the initial state dynamically
    const initialState = FORMFIELDS.reduce((acc, field) => {
      acc[field.fieldName] = user?.[field.fieldName] || ""; 
      return acc;
    }, {});

    const [mailDetails, setMailDetails] = useState(initialState);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMailSending, setIsMailSending] = useState(false);

    const closeModal = () =>[
      setIsModalOpen(false)
    ]

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        const formError = isValidForm(FORMFIELDS, mailDetails);

        const formData = new FormData();
        if(selectedFile){
          formData.append("file", selectedFile);
        }

        if(formError){
          setIsError(true);
          setMessage(formError)
        }else{    
          
          if(!user){
            setIsError(true);
            setMessage("As you are not logged in so this data will not be saved");
            return;
          }

          if(!user?.isCVUploaded && !selectedFile){
            setIsError(true);
            setMessage("You have not uploaded your Resume earlier and not included this time. So plese choose a file.");
            return;
          }

          for(let field of FORMFIELDS){
            formData.append(field.fieldName, mailDetails[field.fieldName])
          }

          const sendMailAfterMilliseconds = new Date(mailDetails.dateTime) - new Date();
          formData.append('sendMailAfterMilliseconds',sendMailAfterMilliseconds);
          setIsMailSending(true);
          const resp = await applyJob(formData)
          const message = resp?.data?.message || "We will send your job application on time"
          setIsMailSending(false);
          setIsError(false);
          setMessage(message);
          setMailDetails(initialState);

          if(selectedFile){
            const modifiedUser = {
              ...user,
              isCVUploaded : true
            }
            
            setUserDetails(modifiedUser);
          }
        }
      } catch(err) {
        setIsError(true);
        setIsMailSending(false);
        const errorMessage = err?.response?.data?.error || "Something went wrong";
        setMessage(errorMessage);
      }

    };

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleChange = (e) =>{
      const {name, value} = e.target;
      setMailDetails(prevMailDetails =>{
        return{
          ...prevMailDetails,
          [name] : value
        }
      })
    }
      
    return (
      <div>
        <div>
          <h4 className={classes.sectionTitle}>Here are Your Details</h4>
          <div className={classes.userDetails}>
            <div className={classes.profileDetails}>
              <label>LinkedIn Profile</label>
              {user?.linkedinProfile ? (
                <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer">
                  {user.linkedinProfile}
                </a>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={classes.profileDetails}>
              <label>GitHub Profile</label>
              {user?.githubProfile ? (
                <a href={user.githubProfile} target="_blank" rel="noopener noreferrer">
                  {user.githubProfile}
                </a>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={classes.profileDetails}>
              <label>LeetCode Profile</label>
              {user?.leetcodeProfile ? (
                <a href={user.leetcodeProfile} target="_blank" rel="noopener noreferrer">
                  {user.leetcodeProfile}
                </a>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={classes.profileDetails}>
              <label>Technologies </label>
              {user?.technologies ? (
                <span>
                  {user.technologies}
                </span>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={`${classes.profileDetails} ${classes.expYears}`}>
              <label>Years of Experience </label>
              {user?.expYears ? (
                <span>
                  {user.expYears}
                </span>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

          </div>

          <p className={classes.modifyLink}>
            <span onClick={() => setIsModalOpen(true)}>Click here</span> to modify/add
          </p>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Job Application Email Scheduler">
          <UserDetails onClose={closeModal} />
        </Modal>
        <MessagePopup  isError={isError} message={message} onClose={() => setMessage("")} />
        {/* <UserDetails /> */}
        
        <form onSubmit={handleSubmit}>
          <div>
            { FORMFIELDS.map(field => (
              <div className={classes.formField} key={field.fieldName}>
                <label>
                  {field.label} 
                  {field.isRequired && <span className={classes.required}>*</span>}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={mailDetails[field.fieldName]}
                  name={field.fieldName}
                  onChange={handleChange}
                  className={classes.inputField}
                />
              </div>
            ))}
          </div>

          <div>
            <div className={classes.fileUpload}>
              {user?.isCVUploaded 
                ? <span>You can use your existing resume or upload a new one</span> 
                : <span>You have not uploaded your resume. Please upload it now and you can use it later.</span>
              }
              <label className={classes.customFileUpload}>
                <input disabled={isMailSending} type="file" onChange={handleFileChange} />
                Upload Resume
              </label>
            </div>
            <button type="submit" disabled={isMailSending} className={classes.submitButton}>{ isMailSending ? 'Submitting...' :  'Send Email'}</button>
          </div>
        </form>
      </div>
    )
}

export default NewJobApplication;