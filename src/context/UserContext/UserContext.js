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

    const logoutHandler = () => {
        setUser(null);
        setIsLoggedOut(true); // Mark as logged out
        localStorage.removeItem("user"); // Clear persisted user
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
