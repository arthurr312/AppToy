import React, {useContext} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {UserContext} from '../../context/User';
import * as S from './styles';
export default function Homepage() {
  const {user} = useContext(UserContext);
  return (
    <S.MainContainer>
      <ScrollView>
        <S.MainTitle>Bem-vindo, {user.username}</S.MainTitle>
        <View style={{display: 'flex'}}>
          <S.AlignTitleAndIcon>
            <S.TimerTextTitle>Adicionar um cronômetro</S.TimerTextTitle>
            <TouchableOpacity style={{
                marginLeft: '5%',
              }}>
            <S.PlusIcon />
            </TouchableOpacity>
          </S.AlignTitleAndIcon>
          <S.TimerContainer>
            <S.AlignTimerItens>
              <S.Timer>00:00</S.Timer>
              <View>
                <S.GenericText>Nome do mlk</S.GenericText>
                <S.GenericText>R$ 10,00</S.GenericText>
              </View>
            </S.AlignTimerItens>
          </S.TimerContainer>
        </View>
      </ScrollView>
    </S.MainContainer>
  );
}
