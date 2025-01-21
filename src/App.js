import './App.css';
import { useState, useEffect, useContext } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import JobApplication from './components/JobApplication/JobApplication';
import UserContext, { UserContextProvider } from './context/UserContext/UserContext';
import { getUserInfo } from './api/user';

function App() {
    const userContext = useContext(UserContext);  // Now this will have access to the context
    const [showLogin, setShowLogin] = useState(false); // To control login flow

    useEffect(() => {

        const fetchUserInfo = async () => {
            try {
                const response = await getUserInfo();
                userContext.login(response.data); // Update app state with user info
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if(!userContext.user){
            fetchUserInfo();
        }
    
    }, [userContext]);

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
