import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homepage from '../HomePage';
import Listing from '../Listing';
import {UserContext} from '../../context/User';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './CustomDrawer';
import Profile from '../Profile';
export default function Sidebar() {
  const Drawer = createDrawerNavigator();
  const {user} = useContext(UserContext);
  return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        initialRouteName="Tela Inicial"
        drawerStyle={{
          backgroundColor: '#313131',
          paddingVertical: 20,
        }}
        screenOptions={{
          drawerActiveBackgroundColor: '#010E3F',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -25,
            fontFamily: 'Roboto-Medium',
            fontSize: 15,
          },
        }}>
          <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: ({color}) => (
              <Icon name="person" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Tela Inicial"
          component={Homepage}
          options={{
            drawerIcon: ({color}) => (
              <Icon name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Listagem"
          component={Listing}
          options={{
            drawerIcon: ({color}) => (
              <Icon name="ios-list-outline" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
}
