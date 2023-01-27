import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './src/context/User';
import Routes from './src/routes';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} backgroundColor="#000" />
      <UserProvider>
        <Routes />
      </UserProvider>
    </NavigationContainer>
  );
}
