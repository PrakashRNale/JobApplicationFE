import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Login from './components/Login/Login';

function App() {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false); // To control login flow

        // Check if there's user data stored in localStorage on page load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));  // Set the user data from localStorage
        }
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setShowLogin(false);  // Hide login page after successful login
    };

    return (
        <GoogleOAuthProvider clientId={process.env.CLIEN_ID}>
            <div>
                <Header user={user} setShowLogin={setShowLogin} />
                {showLogin ? (
                    <Login onLoginSuccess={handleLoginSuccess} />  // Show Google Login page
                ) : (
                    <div>
                        <h1>Welcome to the Application</h1>
                        <p>Please log in to continue</p>
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;




  // return (
  //   <div className="App">
  //     <Header />
  //     <JobApplication />
  //     <Footer />
  //   </div>
  // );
// }

// export default App;
