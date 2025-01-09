// LoginPage.js
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const handleLoginSuccess = async (response) => {
        console.log('Google Token:', response.credential);
        try {
            // Send the token to the backend to validate and fetch user info
            const res = await axios.post('http://localhost:8000/auth/google/token', 
                { token: response.credential },
                { withCredentials: true }  // To include cookies for sessions if needed
            );
            console.log('Backend Response:', res.data);
            onLoginSuccess(res.data.user);  // Passing user data back to parent component
            // Save the user data to localStorage
            localStorage.setItem('user', JSON.stringify(res.data.user));  // Storing user data in localStorage
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Google Sign-In</h1>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.error('Google Login Failed')}
                text="signin_with"
            />
        </div>
    );
};

export default Login;
