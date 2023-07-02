import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import * as S from './styles';
import {Text} from 'react-native';

export default function AddTimeModal({
  openModal,
  setOpenModal,
  handleAddTime,
  hoursToAdd,
  setHoursToAdd,
  minutesToAdd,
  setMinutesToAdd,
}) {
  return (
    <Modal transparent={true} visible={openModal}>
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            width: '90%',
            minHeight: '40%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Adicionar tempo
          </Text>
          <S.Label>Horas:</S.Label>
          <S.Field value={hoursToAdd} onChangeText={e => setHoursToAdd(e)} />
          <S.Label>Minutos:</S.Label>
          <S.Field value={minutesToAdd} onChangeText={e => setMinutesToAdd(e)} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setOpenModal(false)}
              style={{
                width: 80,
                backgroundColor: 'transparent',
                marginTop: 3,
              }}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <S.Button onPress={() => handleAddTime(hoursToAdd, minutesToAdd)}>
              <View>
                <Text
                  style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                  Adicionar
                </Text>
              </View>
            </S.Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
