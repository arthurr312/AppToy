import {Image, Text, View} from 'react-native';
import React from 'react';
export const FilterNotFound = ({setOpenModal}) => {
  return (
    <View style={{alignContent: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../../../assets/lupa.png')}
        style={{width: 200, height: 200, alignSelf: 'center'}}
      />
      <Text
        style={{
          fontSize: 21,
          color: '#192d4b',
          textAlign: 'center',
          fontWeight: 'bold',
          paddingTop: 10,
        }}>
        Ops, nenhum resultado encontrado :(
      </Text>
      <Text style={{fontSize: 17, color: '#838383', textAlign: 'center'}}>
        Parece que não encontramos nada,{' '}
        <Text style={{color: 'darkblue'}} onPress={() => setOpenModal(true)}>
          tente novamente
        </Text>
        .
      </Text>
    </View>
  );
};
