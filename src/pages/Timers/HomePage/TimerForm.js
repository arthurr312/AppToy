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
import * as S from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import CloseIcon from 'react-native-vector-icons/Ionicons';
export const TimerForm = () => {
  const [value, setValue] = useState('');
  const [toyValue, setToyValue] = useState(null);
  const [name, setName] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [toyData, setToyData] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [enableResetButton, setEnableResetButton] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  const [openToyOptions, setOpenToyOptions] = useState(false);
  let changeMinutes = 0;
  async function registering() {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/timer`,
        {
          service_toy: toyValue,
          time: value,
          name_client: name,
        },
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setShowComponent(false);
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
      const filterResponse = response.data.brinquedos.map(element => ({
        ...element,
        value: element.id,
        label: element.name,
      }));
      setToyData(filterResponse);
    } catch (error) {
      alert(error);
    }
  }

  const changeTime = () => {
    setSeconds(prevState => {
      if (prevState + 1 === 60) {
        changeMinutes++;
        setMinutes(changeMinutes);
        return 0;
      }
      return prevState + 1;
    });
  };

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
        }:00`,
      );
      clearInterval(customInterval);
    }
    setDisableStartButton(false);
    setEnablePauseButton(false);
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

  useEffect(() => {
    selectInputData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        display: showComponent ? 'flex' : 'none',
      }}>
      <S.TimerContainer>
        <View style={{alignContent: 'center'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                }}>
                <TouchableOpacity onPress={() => setShowComponent(false)}>
                  <CloseIcon
                    name="close"
                    color={'black'}
                    size={25}
                    style={{alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
              <DropDownPicker
                placeholder="Selecione um brinquedo"
                dropDownDirection="BOTTOM"
                style={{
                  border: '2px solid gray',
                  backgroundColor: 'transparent',
                  borderRadius: 6,
                  width: '70%',
                  padding: 10,
                  paddingTop: 7,
                }}
                open={openToyOptions}
                setOpen={setOpenToyOptions}
                dropDownContainerStyle={{
                  backgroundColor: 'white',
                  width: '70%',
                }}
                value={toyValue}
                items={toyData}
                setValue={setToyValue}
                setItems={setToyData}
              />
            </View>
            <S.Field
              placeholder="Nome"
              value={name}
              onChangeText={event => setName(event)}
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
          {isPaused ? (
            <S.Button
              disabled={!enableResetButton}
              style={{
                opacity: enableResetButton === false ? 0.5 : 1,
              }}
              onPress={clear}>
              <S.ButtonsText>Resetar</S.ButtonsText>
            </S.Button>
          ) : (
            <S.Button
              style={{
                opacity: enablePauseButton === false ? 0.5 : 1,
              }}
              disabled={!enablePauseButton}
              onPress={stopTimer}>
              <S.ButtonsText>Pausar</S.ButtonsText>
            </S.Button>
          )}
          <S.Button
            disabled={!isPaused}
            onPress={() => registering()}
            style={{
              opacity: isPaused ? 1 : 0.5,
            }}>
            <S.ButtonsText>Encerrar</S.ButtonsText>
          </S.Button>
        </S.AlignIcons>
      </S.TimerContainer>
    </View>
  );
};
