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
import {Image, Text, TouchableOpacity, View} from 'react-native';
const Stack = createNativeStackNavigator();

function HeaderTitle({navigation}) {
  return (
    <View style={{flexDirection: 'row', marginRight: 15}}>
      <View style={{justifyContent: 'center'}}>
        <Text style={{color: 'black'}}>oiiiiiiihhiii</Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: 'https://www.techup.co.in/wp-content/uploads/2020/03/techup_final_logo.png',
          }}
          style={{widith: 100, height: 60, resizeMode: 'contain'}}
        />
      </View>
      <View style={{justifyContent: 'center', padding: 5}}>
        <Text style={{color: 'black'}}>oiiiiiiiiiiiiii</Text>
      </View>
    </View>
  );
}
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
