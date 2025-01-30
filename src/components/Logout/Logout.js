// LoginPage.js
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/UserContext/UserContext';

const Login = ({setShowLogin}) => {
    const userContext = useContext(UserContext);
    console.log(process.env)
    const handleRedirectLogin = () => {
        console.log(process.env.REACT_APP_API_ENDPOINT+'/auth/google');
        window.location.href = process.env.REACT_APP_API_ENDPOINT+'/auth/google'; // Redirect to your backend
    };
    

    return (
        <div>
            <button onClick={handleRedirectLogin}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
