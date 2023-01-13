import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Button} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Homepage() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [enableResetButton, setEnableResetButton] = useState(false);
  const [value, setValue] = useState();
  const [userName, setUserName] = useState();
  async function Registering(values) {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/timer/clients`,
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
    setEnableResetButton(true);
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
    setEnablePauseButton(false);
    setEnableResetButton(false);
    setDisableStartButton(false);
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
                {/* <S.AlignTimerItens>
                      <S.Timer>
                        {minutes < 10 ? '0' + minutes : minutes}:
                        {seconds < 10 ? '0' + seconds : seconds}
                      </S.Timer>
                      <View>
                        <S.Field/>
                        <S.GenericText>R$ 10,00</S.GenericText>
                      </View>
                    </S.AlignTimerItens> */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{width: '60%', justifyContent: 'center', alignItems: 'center'}}>
                    <S.Field placeholder="Nome" />
                    <S.Field placeholder="Brinquedo" />
                    {/* <DropDownPicker
                      dropDownDirection="AUTO"
                      placeholder="Brinquedo"
                      style={{
                        border: '2px solid gray',
                        backgroundColor: 'transparent',
                        borderRadius: 6,
                        width: '100%',
                        padding: 10,
                        paddingTop: 7,
                      }}
                      //open={openToyOptions}
                      dropDownContainerStyle={{
                        backgroundColor: 'white',
                        width: '100%',
                      }}
                      // value={value}
                      // items={items}
                      // setOpen={setOpenToyOptions}
                      // setValue={setValue}
                      // setItems={setItems}
                    /> */}
                  </View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <S.Timer>
                    {minutes < 10 ? '0' + minutes : minutes}:
                    {seconds < 10 ? '0' + seconds : seconds}
                  </S.Timer>
                  </View>
                </View>
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
                    setDisableStartButton(false);
                    setEnablePauseButton(false);
                  }}>
                  <S.ButtonsText>Pausar</S.ButtonsText>
                </S.Button>
                {/* resetar */}
                <S.Button
                  disabled={!enableResetButton}
                  style={{
                    opacity: enableResetButton === false ? 0.5 : 1,
                  }}
                  onPress={clear}>
                  <S.ButtonsText>Resetar</S.ButtonsText>
                </S.Button>
              </S.AlignIcons>
            </View>
          )}
        </Formik>
      </ScrollView>
    </S.MainContainer>
  );
}
