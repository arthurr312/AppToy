import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './src/context/User';
import { AsyncStorageProvider } from './src/context/ManageAsyncStorage';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
    <AsyncStorageProvider>
    <Routes />
    </AsyncStorageProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
