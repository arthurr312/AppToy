import React, {useState, useContext, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Button} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import {UserContext} from '../../context/User';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Homepage() {
  const {user} = useContext(UserContext);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [value, setValue] = useState();
  const [userName, setUserName] = useState();
  async function Registering(values) {
    try {
      await axios.post(
        `http://app-toy-vinic.herokuapp.com/api/timer/clients`,
        {...values, price_per_minute: value},
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      alert('deu bom ihu');
    } catch (error) {
      alert(error);
    }
  }

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
      setValue(
        `${minutes < 10 ? '0' + minutes : minutes}:${
          seconds < 10 ? '0' + seconds : seconds
        }`,
      );
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setMinutes(0);
    setSeconds(0);
    setValue(0);
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

  async function getUsername() {
    return setUserName(await AsyncStorage.getItem('@username'));
  }

  async function getToken() {
    return alert(JSON.stringify(await AsyncStorage.getItem('@token')));
  }

  getUsername();

  return (
    <S.MainContainer style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          minWidth: '100%',
        }}>
        <Formik
          initialValues={{
            name_client: '',
            price: '',
          }}
          onSubmit={values => Registering(values)}>
          {({handleChange, handleSubmit, values}) => (
            <View>
              <S.MainTitle>Bem-vindo, {userName}</S.MainTitle>
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
                <S.Button onPress={getToken}>
                  <S.ButtonsText>aperta</S.ButtonsText>
                </S.Button>
              </S.AlignIcons>
            </View>
          )}
        </Formik>
      </ScrollView>
    </S.MainContainer>
  );
}
