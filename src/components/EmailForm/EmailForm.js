import { useState } from 'react'; 
import axios from "axios";
import classes from './Style.module.css';

const EmailForm = () => {

    const [mailDetails, setMailDetails] = useState({
      mailTo : '',
      subject : '',
      toName : '',
      dateTime : ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const resp = await axios.post("http://3.7.58.187/api/apply", {
          // const resp =  await axios.post("http://localhost:80/api/apply", {
          toEmail : mailDetails.mailTo,
          subject : mailDetails.subject,
          toName : mailDetails.toName,
          dateTime : new Date(mailDetails.dateTime).toISOString()
        });
        
        const message = resp?.data?.message || "We will send your job application on time"
        debugger;
        alert(message);
        setMailDetails({
          mailTo : '',
          subject : '',
          toName : '',
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
    <div className={classes.emailForm}>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          type="email"
          placeholder="To Email"
          value={mailDetails.mailTo}
          name='mailTo'
          onChange={handleChange}  
          />

        <input
          type="text"
          placeholder="To Name"
          value={mailDetails.toName}
          name='toName'
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

export default EmailForm;