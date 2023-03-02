/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './pages/Login';
import HomePage from './pages/Timers/HomePage';
import TimerListing from './pages/Timers/Listing';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import Registering from './pages/Toys/Registering';
import ToyListing from './pages/Toys/Listing';
import Finance from './pages/Finance';
import {UserContext} from './context/User';
const Stack = createNativeStackNavigator();

function Routes() {
  const {isLogged} = useContext(UserContext);

  return (
    <Stack.Navigator
      screenOptions={{
        orientation: 'portrait',
      }}>
      {isLogged === 'true' ? (
        <>
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
            name="Listing"
            component={TimerListing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Perfil"
            component={Profile}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Finanças"
            component={Finance}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Registering"
            component={Registering}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ToyListing"
            component={ToyListing}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name="App"
            component={Login}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default Routes;
