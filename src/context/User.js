import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
            <UserContext.Provider value={{userName, setUserName, password, setPassword}}>
                {children}
            </UserContext.Provider>
        </>
    )
}