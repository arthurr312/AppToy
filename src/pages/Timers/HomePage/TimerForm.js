/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import * as S from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Ionicons';
import {Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
import {TimerModal} from './TimerModal';
LogBox.ignoreLogs(['new NativeEventEmitter']);
export const TimerForm = () => {
  const [value, setValue] = useState('');
  const [toyValue, setToyValue] = useState(null);
  const [name, setName] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [toyData, setToyData] = useState([]);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [enableResetButton, setEnableResetButton] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  const [openToyOptions, setOpenToyOptions] = useState(false);
  const [postMessage, setPostMessage] = useState('');
  const [postVisible, setPostVisible] = useState(false);
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectMessage, setSelectMessage] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [timerData, setTimerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function registering() {
    try {
      setIsLoading(true);
      const response = await axios.post(
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
      setTimerData(response.data.timer);
      setOpenModal(true);
    } catch (error) {
      setPostMessage('Ocorreu um erro inesperado, tente novamente.');
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
      setSelectMessage('Ops, ocorreu um erro inesperado, recarregue o app.');
    }
  }
  const closeSnackbar = () => {
    setPostVisible(false);
    setSelectVisible(false);
  };

  const changeTime = () => {
    setSeconds(prevState => {
      if (prevState + 1 === 60) {
        setMinutes(prevState => {
          prevState => prevState + 1;
          if (prevState + 1 === 60) {
            setHours(prevState => prevState + 1);
            return 0;
          }
          return prevState + 1;
        });
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
      BackgroundTimer.setInterval(() => {
        changeTime();
      }, 1000),
    );

    setIsPaused(false);
    setEnablePauseButton(true);
    setDisableStartButton(true);
    setEnableResetButton(true);
  };

  const stopTimer = () => {
    setIsPaused(true);
    setValue(
      `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }:${seconds < 10 ? '0' + seconds : seconds}`,
    );
    clearInterval(customInterval);

    setDisableStartButton(false);
    setEnablePauseButton(false);
    BackgroundTimer.clearTimeout(customInterval);
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
        {showTimer ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <BackIcon
                name="arrow-back"
                color="black"
                size={25}
                style={{
                  marginLeft: 3,
                  marginTop: 2,
                }}
                onPress={() => setShowTimer(false)}
              />
              <CloseIcon
                onPress={() => setShowComponent(false)}
                name="close"
                color="black"
                size={25}
                style={{marginTop: 2}}
              />
            </View>
            <S.Timer>
              {hours < 10 ? '0' + hours : hours}:
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds} - {name}
            </S.Timer>
            {isLoading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color="#003e9b"
                  style={{
                    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </>
            ) : (
              <>
                <S.AlignButtons>
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
                </S.AlignButtons>
              </>
            )}
          </>
        ) : (
          <>
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
                    <CloseIcon
                      onPress={() => setShowComponent(false)}
                      name="close"
                      color="black"
                      size={25}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </View>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    loading={true}
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
                    dropDownContainerStyle={{
                      backgroundColor: 'white',
                      width: '70%',
                      height: '300%',
                    }}
                    value={toyValue}
                    items={toyData}
                    setOpen={setOpenToyOptions}
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
            </View>
            <S.AlignIcons>
              <S.Button onPress={() => setShowTimer(true)}>
                <S.ButtonsText>Próximo</S.ButtonsText>
              </S.Button>
            </S.AlignIcons>
          </>
        )}
      </S.TimerContainer>
      <TimerModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        timerData={timerData}
        setShowComponent={setShowComponent}
        setIsLoading={setIsLoading}
      />
      <Snackbar
        visible={postVisible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: '#010E3F'}}
        duration={3000}>
        {postMessage}
      </Snackbar>
      <Snackbar
        visible={selectVisible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: '#010E3F'}}
        duration={3000}>
        {selectMessage}
      </Snackbar>
    </View>
  );
};
