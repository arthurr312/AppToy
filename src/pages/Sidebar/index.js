import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homepage from '../HomePage';
import Listing from '../Listing';
import {UserContext} from '../../context/User';
import Icon from 'react-native-vector-icons/Ionicons';
import FinanceIcon from 'react-native-vector-icons/FontAwesome5';
import TimerIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlusIcon from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './CustomDrawer';
import Profile from '../Profile';
import Registering from '../Toys/Registering';
import ToyListing from '../Toys/Listing';
import Finance from '../Finance';
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
        name="Finanças"
        component={Finance}
        options={{
          drawerIcon: ({color}) => (
            <FinanceIcon name="dollar-sign" size={22} color={color} style={{paddingLeft: 5, paddingRight: 7}} />
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
        name="Cadastro de brinquedos"
        component={Registering}
        options={{
          drawerIcon: ({color}) => (
            <PlusIcon name="plus" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Listagem de brinquedos"
        component={ToyListing}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="ios-list-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Listagem de cronômetros"
        component={Listing}
        options={{
          drawerIcon: ({color}) => (
            <TimerIcons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
