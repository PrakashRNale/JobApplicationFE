import './App.css';
import { useState, useEffect, useContext } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import JobApplication from './components/JobApplication/JobApplication';
import UserContext, { UserContextProvider } from './context/UserContext/UserContext';

function App() {
    const userContext = useContext(UserContext)
    const [showLogin, setShowLogin] = useState(false); // To control login flow

    return (
        <UserContextProvider>
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
        </UserContextProvider>
    )


}

export default App;
