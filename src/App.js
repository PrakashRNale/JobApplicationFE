import './App.css';
import { useState, useEffect, useContext } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Logout/Logout';
import JobApplication from './components/JobApplication/JobApplication';
import UserContext, { UserContextProvider } from './context/UserContext/UserContext';
import { getUserInfo } from './api/user';

function App() {
    const userContext = useContext(UserContext);  // Now this will have access to the context
    const [showLogin, setShowLogin] = useState(false); // To control login flow

    const fetchUserInfo = async () => {
        try {
            userContext.setLoading(true);
            const response = await getUserInfo();
            userContext.setUserDetails(response.data); // Update app state with user info
            userContext.setLoading(false);
        } catch (error) {
            console.error('Error fetching user info:', error);
            userContext.setLoading(false);
        }
    };

    useEffect(() => {
        if (!userContext.user && !userContext.loading) {
            console.log('Fetching user info...');
            fetchUserInfo();
        }
    }, []); // Run this only **once** on mount, not when user changes
    

    return (
        <div className='App'>
            <Header setShowLogin={setShowLogin} />
            {
                showLogin ? 
                    <Login setShowLogin={setShowLogin} />
                :
                <JobApplication />
            }
            <Footer />
        </div>
    )
}

function AppWrapper() {
    return (
        <UserContextProvider>
            <App />
        </UserContextProvider>
    );
}

export default AppWrapper;
