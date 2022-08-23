import React from "react";
import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

      async function login(values) {
    await axios.post(`https://app-toy-vinic.herokuapp.com/api/login`, values);
    alert('deu bom'); 
  }

    function signIn(userName, passWord) {
        if (userName !== '' && passWord !== '') {
            setUser({username: userName, password: passWord})
        }
        navigation.navigate("Sidebar")
    }

    return (
        <>
            <UserContext.Provider value={{ user, signIn }}>
                {children}
            </UserContext.Provider>
        </>
    )
}