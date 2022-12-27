import React, { useState } from 'react';
import { FlatList, Image, Text, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles';
export default function Profile() {
  const window = useWindowDimensions();
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
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
      <View style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "90%",
        minHeight: "60%",
        paddingBottom: 15,
        backgroundColor: "white",
        elevation: 6,
        borderRadius: 7,
      }}>
        <View style={{ width: '80%', paddingTop: 5 }}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 26,
            color: 'black',
            textAlign: 'center',
            marginTop: 15
          }}>
            Redefinir senha
          </Text>
        </View>
        <S.ResetPasswordIconContainer>
          <Image
            source={require('../../assets/reset.png')}
            style={{ width: 130, height: 130 }}
          />
        </S.ResetPasswordIconContainer>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: 18, color: 'black' }}>
            A fim de <Text style={{ fontWeight: 'bold' }}>proteger sua conta</Text>, tenha certeza que sua senha:
          </Text>
        </View>
        <View style={{
          width: '70%', padding: 10
        }}>
          <FlatList
            data={[
              { value: 'Tem no mínimo 5 caracteres;' },
              { value: 'Tem no máximo 15 caracteres.' },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 15, color: 'black' }}>{`\u2022 ${item.value}`}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <S.Field
            secureTextEntry={oldPasswordVisibility}
            placeholder="Digite sua senha antiga"
            onChangeText={event => setOldPassword(event)}
          />
          {oldPasswordVisibility ? (
            <Icon
              name="eye-off-outline"
              size={25}
              color="grey"
              style={{ position: 'absolute', right: 15, top: 23 }}
              onPress={() => setOldPasswordVisibility(prevState => !prevState)}
            />
          ) : (
            <Icon
              name="eye-outline"
              size={25}
              color="grey"
              style={{ position: 'absolute', right: 15, top: 23 }}
              onPress={() => setOldPasswordVisibility(prevState => !prevState)}
            />
          )}
        </View>
        <View style={{ flexDirection: 'row' }}>
          <S.Field
            secureTextEntry={newPasswordVisibility}
            placeholder="Digite sua nova senha"
            onChangeText={event => setNewPassword(event)}
          />
          {newPasswordVisibility ? (
            <Icon
              name="eye-off-outline"
              size={25}
              color="grey"
              style={{ position: 'absolute', right: 15, top: 23 }}
              onPress={() => setNewPasswordVisibility(prevState => !prevState)}
            />
          ) : (
            <Icon
              name="eye-outline"
              size={25}
              color="grey"
              style={{ position: 'absolute', right: 15, top: 23 }}
              onPress={() => setNewPasswordVisibility(prevState => !prevState)}
            />
          )}
        </View>
        <S.Button onPress={changePassword}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Confirmar
          </Text>
        </S.Button>
      </View>

    </S.MainContainer>
  );
}
