/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Formik} from 'formik';
import {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SelectInput} from '../../Finance/SelectInput';
import * as S from './styles';
export const TimerForm = () => {
  const [value, setValue] = useState();

  const [seconds, setSeconds] = useState(0);
  const [toyData, setToyData] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [enableResetButton, setEnableResetButton] = useState(false);
  const [toyValue, setToyValue] = useState(null);
  const [openToyOptions, setOpenToyOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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

  async function selectInputData() {
    try {
      const response = await axios.get(
        `https://apptoydev.000webhostapp.com/api/brinquedo`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      const filterResponse = response.data.brinquedos.map(item => ({
        ...item,
        value: item.id,
        label: item.name,
      }));
      setToyData(filterResponse);
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

  useEffect(() => {
    selectInputData();
  }, []);
  return (
    <Formik
      initialValues={{
        name_client: '',
        price: '',
      }}
      onSubmit={values => Registering(values)}>
      {({handleChange, handleSubmit, values}) => (
        <View>
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
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <S.Field placeholder="Nome" />
                <SelectInput
                  dropDownDirection="BOTTOM"
                  items={toyData}
                  setItems={setToyData}
                  setValue={setToyValue}
                  value={toyValue}
                  label=""
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
  );
};
