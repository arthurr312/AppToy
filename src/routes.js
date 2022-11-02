/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Listing from './pages/Listing';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
const Stack = createNativeStackNavigator();

function Routes() {
  const [screenValue, setScreenValue] = useState('');
  async function getInitialScreen() {
    const initialScreen = await AsyncStorage.getItem('@initial_screen');
    return setScreenValue(initialScreen);
  }
  getInitialScreen();

  return (
    <Stack.Navigator initialRouteName={screenValue}>
      <Stack.Screen
        options={{headerShown: false}}
        name="App"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Sidebar"
        component={Sidebar}
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
        name="Perfil"
        component={Profile}
      />
    </Stack.Navigator>
  );
}

export default Routes;
