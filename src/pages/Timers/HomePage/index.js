/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {Teste} from './teste';
import {
  View,
  ScrollView,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerForm} from './TimerForm';

export default function Homepage() {
  const window = useWindowDimensions();
  const [disableWarningMessage, setDisableWarningMessage] = useState(false);
  const [userName, setUserName] = useState();
  const [components, setComponents] = useState([]);

  async function getUsername() {
    return setUserName(await AsyncStorage.getItem('@username'));
  }

  getUsername();

  function addComponent() {
    setDisableWarningMessage(true);
    setComponents([...components, <Teste />]);
  }

  return (
    <View style={{flex: 1, height: '100%'}}>
      <ScrollView>
        <View
          style={{
            height: window.height / 1.25,
            justifyContent: 'center',
            display: disableWarningMessage ? 'none' : 'flex',
          }}>
          <S.AlignImageAndLabel>
            <S.Image source={require('../../../assets/timerIcon.png')} />
            <S.MainText>
              Olá, {userName}, bem-vindo ao cadastro de cronômetros! :)
            </S.MainText>
            <Text
              style={{
                fontSize: 17,
                color: '#838383',
                textAlign: 'center',
                width: '100%',
              }}>
              <Text onPress={addComponent} style={{color: 'darkblue'}}>
                Clique aqui
              </Text>{' '}
              para cadastrar e iniciar um cronômetro.
            </Text>
          </S.AlignImageAndLabel>
        </View>
        <S.AlignTitleAndIcon
          style={{display: disableWarningMessage ? 'flex' : 'none'}}>
          <S.TimerTextTitle>Adicionar um cronômetro</S.TimerTextTitle>
          <TouchableOpacity
            onPress={addComponent}
            style={{
              marginLeft: '5%',
            }}>
            <S.PlusIcon />
          </TouchableOpacity>
        </S.AlignTitleAndIcon>
        {components.map(i => {
          return (
            <>
              <TimerForm key={i} />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}
