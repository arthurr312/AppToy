import React, {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageContext = createContext({});

export const AsyncStorageProvider = ({children}) => {
  async function setAsyncStorage(key, value) {
    const setAsync = await AsyncStorage.setItem(key, value);
    return setAsync;
  }

  async function getAsyncStorage(keyName) {
    const getAsync = await AsyncStorage.getItem(keyName);
    return getAsync;
  }

  async function removeAsyncStorage(keyName) {
    const removeAsync = await AsyncStorage.removeItem(keyName);
    return removeAsync;
  }

  return (
    <>
      <AsyncStorageContext.Provider
        value={(setAsyncStorage, getAsyncStorage, removeAsyncStorage)}>
        {children}
      </AsyncStorageContext.Provider>
    </>
  );
};