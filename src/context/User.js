import React from 'react';
import {createContext, useState} from 'react';
export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  //const [initialScreen, setInitialScreen] = useState();
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState();
  const [updateToyTable, setUpdateToyTable] = useState(false);
  const [updateTimerTable, setUpdateTimerTable] = useState(false);
  function signIn(userName, passWord) {
    if (userName !== '' && passWord !== '') {
      setUser({username: userName, password: passWord});
    }
  }

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          signIn,
          isLogged,
          setIsLogged,
          updateToyTable,
          setUpdateToyTable,
          updateTimerTable,
          setUpdateTimerTable,
        }}>
        {children}
      </UserContext.Provider>
    </>
  );
};
