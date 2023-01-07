/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Listing from './pages/Listing';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import Registering from './pages/Toys/Registering';
import ToyListing from './pages/Toys/Listing';
import Finance from './pages/Finance';
import { UserContext } from './context/User';
const Stack = createNativeStackNavigator();

function Routes() {
const { isLogged } = useContext(UserContext);

  return (
    <Stack.Navigator initialRouteName={isLogged === 'false' ? 'App' : 'HomePage'}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="App"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Sidebar"
        component={Sidebar}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Listing"
        component={Listing}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Perfil"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Finanças"
        component={Finance}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Registering"
        component={Registering}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ToyListing"
        component={ToyListing}
      />
    </Stack.Navigator>
  );
}

export default Routes;
