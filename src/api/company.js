import axios from "axios";
// const API_ENDPOINT = 'http://localhost:80';
const API_ENDPOINT = 'http://3.111.32.46:5000';

export const applyJob = async (mailDetails) =>{
    const resp =  await axios.post(API_ENDPOINT+"/api/apply", {
        companyName : mailDetails.companyName,
        hrEmail : mailDetails.HREmail,
        hrName : mailDetails.HRName,
        subject : mailDetails.subject,
        targetDateTime : new Date(mailDetails.dateTime).toISOString()
      });
    return resp;
}

export const getAllAppliedJobs = async () =>{
    const resp =  await axios.get(API_ENDPOINT+"/api/getApplied");
    return resp;
}
