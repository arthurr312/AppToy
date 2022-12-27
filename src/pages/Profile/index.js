import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles';
export default function Profile() {
  const window = useWindowDimensions();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  async function changePassword() {
    try {
      await axios.post(`https://apptoydev.000webhostapp.com/api/user/new-pass`, {
        oldPass: oldPassword,
        newPass: newPassword,
      }, {
        headers: {
          Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
        },
      },);
      alert('deu bom');
    } catch (error) {
      alert(error);
    }
  }
  return (
    <S.MainContainer>
      <Image
        source={require('../../assets/app_logo.png')}
        style={{ width: 150, height: 150 }}
      />
      <View style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "90%",
        minHeight: "60%",
        backgroundColor: "white",
        elevation: 6,
        borderRadius: 7,
      }}>
        <View style={{ width: '80%', paddingVertical: 10 }}>
          <Text style={{
            fontFamily: 'Ubuntu',
            fontWeight: 'bold',
            fontSize: 26,
            color: 'black'
          }}>Mudar senha</Text>
        </View>
        <View style={{ width: '70%', backgroundColor: 'blue' }}>
          <Text>
            A fim de proteger sua conta, tenha certeza que sua senha:
          </Text>
        </View>
        <View style={{
          width: '50%', backgroundColor: 'red'
        }}>
          <FlatList
            data={[
              { value: 'tem no mínimo 5 caracteres;' },
              { value: 'tem no máximo 15 caracteres;' },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16 }}>{`\u2022 ${item.value}`}</Text>
                </View>
              );
            }}
          />
        </View>
        <S.Field
          placeholder="Digite sua senha antiga"
          onChangeText={event => setOldPassword(event)}
        />
        <S.Field
          placeholder="Digite sua nova senha"
          onChangeText={event => setNewPassword(event)}
        />
        <S.Button onPress={changePassword}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Confirmar
          </Text>
        </S.Button>
      </View>

    </S.MainContainer>
  );
}
