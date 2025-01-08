import { useState } from 'react'; 

import classes from './Style.module.css';
import { applyJob } from '../../api/company'

const NewJobApplication = () => {

    const [mailDetails, setMailDetails] = useState({
      companyName : '',
      HREmail : '',
      HRName : '',
      subject : '',
      dateTime : ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        
        const resp = applyJob(mailDetails)
  
        const message = resp?.data?.message || "We will send your job application on time"
        debugger;
        alert(message);
        setMailDetails({
          companyName : '',
          HREmail : '',
          HRName : '',
          subject : '',
          dateTime : ''
        })
      } catch(err) {
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
        <form onSubmit={handleSubmit}>
          <div>

            <input 
            type="text"
            placeholder="Company Name"
            value={mailDetails.companyName}
            name='companyName'
            onChange={handleChange}  
            />

            <input 
            type="mail"
            placeholder="HR Email"
            value={mailDetails.HREmail}
            name='HREmail'
            onChange={handleChange}  
            />

          <input
            type="text"
            placeholder="HR Name"
            value={mailDetails.HRName}
            name='HRName'
            onChange={handleChange}  
            />

            <input
            type="text"
            placeholder="Subject"
            value={mailDetails.subject}
            name='subject'
            onChange={handleChange}  
            />

            <input 
            type="datetime-local" 
            name="dateTime"
            value={mailDetails.dateTime}
            onChange={handleChange} />

          </div>

          <div>
            <button type="submit">Send Email</button>
          </div>
        </form>
      </div>
    )
}

export default NewJobApplication;