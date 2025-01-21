import axios from "axios";

export const getUserInfo = async () =>{
    const resp =  await axios.get(process.env.REACT_APP_API_ENDPOINT+"/user/info",{
          withCredentials: true,  // If you need to send cookies with the request
    });
    return resp;
}