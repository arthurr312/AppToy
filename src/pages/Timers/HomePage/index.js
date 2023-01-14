/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  useWindowDimensions,
  Modal,
} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {SelectInput} from '../../Finance/SelectInput';

export default function Homepage() {
  const window = useWindowDimensions();
  const [seconds, setSeconds] = useState(0);
  const [toyData, setToyData] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [enablePauseButton, setEnablePauseButton] = useState(false);
  const [disableStartButton, setDisableStartButton] = useState(false);
  const [enableResetButton, setEnableResetButton] = useState(false);
  const [value, setValue] = useState();
  const [userName, setUserName] = useState();
  const [toyValue, setToyValue] = useState(null);
  const [openToyOptions, setOpenToyOptions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(true);

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
      alert('Ocorreu um erro inesperado, tente novamente.');
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
    <ScrollView>
      <View style={{display: showWarningMessage === false ? 'none' : 'flex'}}>
        <S.AlignImageAndLabel style={{height: window.height / 1.25}}>
          <S.Image source={require('../../../assets/timerIcon.png')} />
          <S.MainText>
            Bem-vindo ao cadastro de cronômetros, {userName}! :)
          </S.MainText>
          <Text style={{fontSize: 17, color: '#838383', textAlign: 'center'}}>
            <Text
              onPress={() => setOpenModal(true)}
              style={{color: 'darkblue'}}>
              Clique aqui
            </Text>{' '}
            para cadastrar e iniciar um cronômetro.
          </Text>
        </S.AlignImageAndLabel>
      </View>
      <View>
        <Modal transparent={true} visible={openModal}>
          <S.OutSideModalBg>
            <S.ModalContainer>
              <Formik
                initialValues={{
                  name_client: '',
                  price: '',
                }}
                onSubmit={values => Registering(values)}>
                {({handleChange, handleSubmit, values}) => (
                  <View>
                    <S.AlignTitleAndIcon>
                      <S.TimerTextTitle>
                        Adicionar um cronômetro
                      </S.TimerTextTitle>
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
                            dropDownDirection="TOP"
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
            </S.ModalContainer>
          </S.OutSideModalBg>
        </Modal>
      </View>
    </ScrollView>
  );
}
