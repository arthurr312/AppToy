import React, {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageContext = createContext({});

export const AsyncStorageProvider = ({children}) => {
  async function setAsyncStorage(token) {
    try {
      await AsyncStorage.setItem('@token', token);
    } catch (e) {
      alert(e);
    }
  }

  async function getAsyncStorage() {
    try {
      await AsyncStorage.getItem('@token');
    } catch (e) {
      alert(e);
    }
  }

  async function removeAsyncStorage() {
    try {
      await AsyncStorage.removeItem('@token');
    } catch (e) {
      alert(e);
    }
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
