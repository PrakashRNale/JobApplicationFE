import { useState } from 'react'; 

import classes from './Style.module.css';
import { applyJob } from '../../api/company'
import { FORMFIELDS } from '../../constants/formFields';
import ErrorPopup from '../ErrorMessage/ErrorMessage';
import { isValidForm } from '../../utils/validateForm';

const NewJobApplication = () => {

    // Generate the initial state dynamically
    const initialState = FORMFIELDS.reduce((acc, field) => {
      acc[field.fieldName] = ""; 
      return acc;
    }, {});

    const [mailDetails, setMailDetails] = useState(initialState);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        const formError = isValidForm(FORMFIELDS, mailDetails);

        if(formError){
          setError(formError)
        }else{      
          const resp = await applyJob(mailDetails)
          const message = resp?.data?.message || "We will send your job application on time"
          debugger;
          alert(message);
          setMailDetails(initialState)
        }
      } catch(err) {
        debugger;
        const errorMessage = err?.response?.data?.error || "Something went wrong";
        alert(errorMessage);
      }

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
        <ErrorPopup  message={error} onClose={() => setError("")} />
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
            <button type="submit">Send Email</button>
          </div>
        </form>
      </div>
    )
}

export default NewJobApplication;