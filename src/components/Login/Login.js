// LoginPage.js
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/UserContext/UserContext';

const Login = ({setShowLogin}) => {
    const userContext = useContext(UserContext);
    console.log(process.env)
    const handleLoginSuccess = async (response) => {
        console.log('Google Token:', response.credential);
        localStorage.setItem("token", response.credential)
        try {
            // Send the token to the backend to validate and fetch user info
            const res = await axios.post('http://localhost:8000/auth/google/token', 
                { token: response.credential },
                { withCredentials: true }  // To include cookies for sessions if needed
            );
            userContext.login(res.data.user);  // Passing user data back to parent component
            setShowLogin(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <div className=''>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.error('Google Login Failed')}
                text="signin_with"
            />
        </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
