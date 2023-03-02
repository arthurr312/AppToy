/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import * as S from './styles';
import {TimerForm} from './TimerForm';
export const TimerComponent = ({
  disableWarningMessage,
  userName,
  addComponent,
  components,
}) => {
  const window = useWindowDimensions();
  return (
    <>
      <View
        style={{
          height: window.height / 1.25,
          justifyContent: 'center',
          display: disableWarningMessage ? 'none' : 'flex',
        }}>
        <S.AlignImageAndLabel>
          <S.Image source={require('../../../assets/timerIcon.png')} />
          <S.MainText>
            {userName ? (
              `Olá, ${userName}, bem-vindo ao cadastro de cronômetros! :)`
            ) : (
              <>Você está deslogado, por favor, faça login para continuar</>
            )}
          </S.MainText>
          <Text
            style={{
              fontSize: 17,
              marginTop: 5,
              color: '#838383',
              textAlign: 'center',
              width: '100%',
            }}>
            <Text onPress={addComponent} style={{color: 'darkblue'}}>
              Clique aqui
            </Text>{' '}
            para iniciar um cronômetro.
          </Text>
        </S.AlignImageAndLabel>
      </View>
      <S.AlignTitleAndIcon
        style={{display: disableWarningMessage ? 'flex' : 'none'}}>
        <S.TimerTextTitle>Adicionar novo cronômetro</S.TimerTextTitle>
        <TouchableOpacity
          onPress={addComponent}
          style={{
            marginLeft: '5%',
          }}>
          <S.PlusIcon />
        </TouchableOpacity>
      </S.AlignTitleAndIcon>
      <View style={{height: '100%', paddingBottom: '25%'}}>
        {components.map((i, index) => {
          return <TimerForm key={index + 1} />;
        })}
      </View>
    </>
  );
};
