import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {UserProvider} from './src/context/User';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
       <Routes/>
      </UserProvider>
    </NavigationContainer>
  );
}