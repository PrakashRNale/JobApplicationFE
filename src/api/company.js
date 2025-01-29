import axios from "axios";
// const API_ENDPOINT = 'http://3.111.32.46:5000';

export const applyJob = async (formData) =>{
    const token = localStorage.getItem("token")
    const resp =  await axios.post(process.env.REACT_APP_API_ENDPOINT+"/api/apply", 
      // {
      //   companyName : mailDetails.companyName,
      //   hrEmail : mailDetails.HREmail,
      //   hrName : mailDetails.HRName,
      //   subject : mailDetails.subject,
      //   targetDateTime : new Date(mailDetails.dateTime).toISOString()
      // },
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,  // Adding token in the Authorization header
        },
        withCredentials: true,  // If you need to send cookies with the request
      }
    );
    return resp;
}

export const getAllAppliedJobs = async () =>{
    const token = localStorage.getItem("token")
    const resp =  await axios.get(process.env.REACT_APP_API_ENDPOINT+"/api/getApplied",{
        headers: {
            'Authorization': `Bearer ${token}`,  // Adding token in the Authorization header
          },
          withCredentials: true,  // If you need to send cookies with the request
    });
    return resp;
}
