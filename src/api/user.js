import axios from "axios";

export const getUserInfo = async () =>{
    const resp =  await axios.get(process.env.REACT_APP_API_ENDPOINT+"/user/info",{
          withCredentials: true,  // If you need to send cookies with the request
    });
    return resp;
}

export const setUserInfo = async (userDetails) =>{
    const resp =  await axios.post(process.env.REACT_APP_API_ENDPOINT+"/user/setUser", userDetails,{
            withCredentials: true,  // If you need to send cookies with the request
    });
    return resp;
}

export const logoutUser = async () =>{
    axios.post(process.env.REACT_APP_API_ENDPOINT + "/auth/logout", {}, { withCredentials: true })
}