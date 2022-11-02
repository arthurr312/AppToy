import React, {useContext} from 'react';
import {UserContext} from '../../context/User';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const CustomDrawer = props => {
  const navigation = useNavigation();
  const {setInitialScreen} = useContext(UserContext);
  async function logout() {
    AsyncStorage.removeItem('@token');
    AsyncStorage.removeItem('@username');
    await AsyncStorage.setItem('@initial_screen', 'App');
    navigation.navigate('App');
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={logout} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="md-log-out-outline" size={30} color="black" />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                color: 'black',
              }}>
              Sair da conta
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
