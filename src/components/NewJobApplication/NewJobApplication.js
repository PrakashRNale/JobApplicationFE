import { useContext, useState } from 'react'; 

import classes from './Style.module.css';
import { applyJob } from '../../api/company'
import { FORMFIELDS } from '../../constants/formFields';
import ErrorPopup from '../ErrorMessage/ErrorMessage';
import { isValidForm } from '../../utils/validateForm';
import UserContext from '../../context/UserContext/UserContext';
import UserDetails from '../UserDetails/UserDetails';
import Modal from '../Modal/Modal';
import MessagePopup from '../ErrorMessage/ErrorMessage';

const NewJobApplication = () => {
    const { user } = useContext(UserContext);
    // Generate the initial state dynamically
    const initialState = FORMFIELDS.reduce((acc, field) => {
      acc[field.fieldName] = user[field.fieldName] || ""; 
      return acc;
    }, {});

    const [mailDetails, setMailDetails] = useState(initialState);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
          setMessage(formError)
        }else{      

          for(let field of FORMFIELDS){
            formData.append(field.fieldName, mailDetails[field.fieldName])
          }

          const resp = await applyJob(formData)
          const message = resp?.data?.message || "We will send your job application on time"
          setIsError(false);
          setMessage(message);
          setMailDetails(initialState)
        }
      } catch(err) {
        setIsError(true);
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
              {user.linkedinProfile ? (
                <a href={user.linkedinProfile} target="_blank" rel="noopener noreferrer">
                  {user.linkedinProfile}
                </a>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={classes.profileDetails}>
              <label>GitHub Profile</label>
              {user.githubProfile ? (
                <a href={user.githubProfile} target="_blank" rel="noopener noreferrer">
                  {user.githubProfile}
                </a>
              ) : (
                <span className={classes.notProvided}>Not Provided</span>
              )}
            </div>

            <div className={classes.profileDetails}>
              <label>LeetCode Profile</label>
              {user.leetcodeProfile ? (
                <a href={user.leetcodeProfile} target="_blank" rel="noopener noreferrer">
                  {user.leetcodeProfile}
                </a>
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
            { FORMFIELDS.map(field =>{
              return <div className={classes.formField}>
                <label>{field.label} {field.isRequired ? <span className={classes.required}>*</span> : null }</label> 
                <input 
                  type={field.type}
                  placeholder={field.placeholder}
                  value={mailDetails[field.fieldName]}
                  name={field.fieldName}
                  onChange={handleChange}  
                />
              </div>
            })}
          </div>

          <div>
            <div className={classes.fileUplaod}>
              {user.isCVUploaded ? <span>You can use Existing Resume or you can upload new</span> : <span>You have not uploaded your resume so you need to uplod it now and you can use it later</span>}
              <label className={classes.customFileUpload}>
                <input type="file" onChange={handleFileChange} />
                Upload Resume
              </label>
              </div>
            <button type="submit">Send Email</button>
          </div>
        </form>
      </div>
    )
}

export default NewJobApplication;