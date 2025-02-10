import { useState, useEffect, createContext } from "react";

const UserContext = createContext({
    user: null,
    loading: false,
    isLoggedOut: false,  // 👈 New state to track logout
    setUserDetails: () => {},
    setLoading: () => {},
    setIsLoggedOut: () => {}
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false);  // 👈 Track logout status

    useEffect(() => {
        // Load user from localStorage if available
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginHandler = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // 👈 Persist user
        setIsLoggedOut(false);  // Reset logout status
    };

    function deleteAllCookies() {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        }
    }
   

    const logoutHandler = () => {
        setUser(null);
        setIsLoggedOut(true); // Mark as logged out
        localStorage.removeItem("user"); // Clear persisted user
        deleteAllCookies();
    };

    const loadingHandler = (loadingState) => {
        setIsLoading(loadingState);
    };

    const contextValue = {
        user,
        setUserDetails: loginHandler,
        loading: isLoading,
        setLoading: loadingHandler,
        isLoggedOut,
        setIsLoggedOut: logoutHandler // Directly set logout
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
