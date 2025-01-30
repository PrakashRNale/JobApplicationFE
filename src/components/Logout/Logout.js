import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/UserContext/UserContext';
import './style.css';
import { logoutUser } from '../../api/user';

const Logout = () => {
    const userContext = useContext(UserContext);
    const handleLogout = async () => {
        try {
            await logoutUser();
            userContext.setUserDetails(null);
            userContext.setIsLoggedOut(true);
    
            // localStorage.removeItem("firstVisit");  // Remove flag to show popup on next visit
    
            setTimeout(() => {
                userContext.setLoading(false);
            }, 300);
    
        } catch (error) {
            console.error("Logout failed:", error);
        }
    
    }
    return (
        <div className='logout-container'>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Logout;
