import React, {useState, useContext} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {UserContext} from '../../context/User';
import Icon from 'react-native-vector-icons/Ionicons';
import RestoreIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as S from './styles';

export default function Homepage() {
  const {user} = useContext(UserContext);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);

  const startTimer = () => {
    if (customInterval != null && !isPaused) {
      return;
    }

    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000),
    );

    setIsPaused(false);
    setEnablePauseButton(true);
    setDisableStartButton(true);
  };

  const stopTimer = () => {
    if (customInterval) {
      setIsPaused(true);
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setMinutes(0);
    setSeconds(0);
    setCustomInterval(null);
    setIsPaused(true);
  };

  const changeTime = () => {
    setSeconds(prevState => {
      if (prevState + 1 === 60) {
        setMinutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  return (
    <S.MainContainer style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          minWidth: '100%',
        }}>
        <S.MainTitle>Bem-vindo, {user.username}</S.MainTitle>
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
            <S.Timer>
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </S.Timer>
            <View>
              <S.GenericText>Nome do mlk</S.GenericText>
              <S.GenericText>R$ 10,00</S.GenericText>
            </View>
          </S.AlignTimerItens>
        </S.TimerContainer>
        <S.AlignIcons>
          {/* iniciar  */}
          <S.Button
            disabled={disableStartButton}
            style={{
              opacity: disableStartButton ? 0.5 : 1,
            }}
            onPress={startTimer}>
            <S.ButtonsText>Iniciar</S.ButtonsText>
          </S.Button>
          {/* pausar  */}
          <S.Button
            style={{
              opacity: enablePauseButton === false ? 0.5 : 1,
            }}
            disabled={!enablePauseButton}
            onPress={() => {
              stopTimer();
              setDisableStartButton(prevState => !prevState);
              setEnablePauseButton(prevState => !prevState);
            }}>
            <S.ButtonsText>Pausar</S.ButtonsText>
          </S.Button>
          {/* resetar */}
          <S.Button onPress={clear}>
            <S.ButtonsText>Resetar</S.ButtonsText>
          </S.Button>
        </S.AlignIcons>
      </ScrollView>
    </S.MainContainer>
  );
}
