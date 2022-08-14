/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Listing from './pages/Listing';
import Sidebar from './pages/Sidebar';
const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="App"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomePage"
        component={HomePage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Listing"
        component={Listing}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Sidebar"
        component={Sidebar}
      />
    </Stack.Navigator>
  );
}

export default Routes;
