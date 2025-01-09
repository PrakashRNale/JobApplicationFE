import { useState, useEffect, createContext } from "react";


const UserContext = createContext({
    user : false,  
	login : () => { }
})

export default UserContext;

export const UserContextProvider = ({children}) =>{
	const [user, setUser] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            debugger;
            const userData = JSON.parse(storedUser);
            setUser(userData);
        }
    }, []);
	const loginHandler = (userData) =>{
        debugger;
		setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); 
    }

    const contextValue = {
        user: user,
        login :loginHandler 
    };

	return (
    <UserContext.Provider value = {contextValue} >
		{children}
	</UserContext.Provider>
    )
}
