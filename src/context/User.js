import React from "react";
import { createContext, useState } from "react";

import axios from "axios";
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
   
    const [user, setUser] = useState({});

    function signIn(userName, passWord) {
        if (userName !== '' && passWord !== '') {
            setUser({username: userName, password: passWord})
        }
        
    }

    return (
        <>
            <UserContext.Provider value={{ user, signIn }}>
                {children}
            </UserContext.Provider>
        </>
    )
}