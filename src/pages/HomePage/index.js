import React, {useContext} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {UserContext} from '../../context/User';
import Icon from 'react-native-vector-icons/Ionicons';
import RestoreIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            <TouchableOpacity
              style={{
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
          <S.AlignIcons>
            <Icon name="ios-play" color="black" size={45} />
            <Icon name="ios-pause-outline" color="black" size={45} />
            <RestoreIcon name="restore" color="black" size={45} />
            <Icon name="ios-stop" color="black" size={45} />
          </S.AlignIcons>
        </View>
      </ScrollView>
    </S.MainContainer>
  );
}
