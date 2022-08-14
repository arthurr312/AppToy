import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Homepage from '../HomePage';
import Listing from '../Listing';
import {UserContext} from '../../context/User'
import {Text} from 'react-native';
import CustomSidebar from './CustomSidebar';
export default function Sidebar() {
  const Drawer = createDrawerNavigator();
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer  independent={true}>
      <Drawer.Navigator
        initialRouteName="HomePage"
        drawerStyle={{
          backgroundColor: '#313131',
          paddingVertical: 20,
        }}
        screenOptions={{
          activeBackgroundColor: '#fff',
          inactiveTintColor: '#fff',
        }}>   
        <Drawer.Screen
          name="Tela Inicial"
          component={Homepage}
          options={{
            drawerLabel: () => (
              <Text style={{color:'#313131'}}>
                Tela Inicial
              </Text>
            ),
          }}
        />
        <Drawer.Screen
          name="Listagem"
          component={Listing}
          options={{
            drawerLabel: () => (
              <Text style={{color:'#313131'}}>
                Listagem
              </Text>
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
