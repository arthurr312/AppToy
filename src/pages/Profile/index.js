import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles';
export default function Profile() {
  async function filtro() {
    try {
      const response = await axios.get(
        `http://app-toy-vinic.herokuapp.com/api/finances/5`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      alert(JSON.stringify(response.data));
    } catch (error) {
      alert('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  useEffect(() => filtro(), []);

  return (
    <S.MainContainer>
      <S.ProfileContainer></S.ProfileContainer>
      <S.OptionsContainer>
        <TouchableOpacity>
          <S.Option>
            <Text style={{textAlign: 'center'}}>Diário</Text>
          </S.Option>
        </TouchableOpacity>
        <TouchableOpacity>
          <S.Option>
            <Text style={{textAlign: 'center'}}>Semanal</Text>
          </S.Option>
        </TouchableOpacity>
        <TouchableOpacity>
          <S.Option>
            <Text style={{textAlign: 'center'}}>Mensal</Text>
          </S.Option>
        </TouchableOpacity>
      </S.OptionsContainer>
    </S.MainContainer>
  );
}
