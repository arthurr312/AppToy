import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';
import {Text, useWindowDimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as S from './styles';

export default function Registering() {
  const window = useWindowDimensions();
  const [price_per_minute, setPricePerMinute] = useState(`${0}, 00`);
  const [messageType, setMessageType] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [message, setMessage] = useState('');
  let formatted = price_per_minute.replace('R$', '');
  let formattedPrice = formatted.replace(',', '.');
  const clearFields = () => {
    setPricePerMinute('');
    setName('');
    setMinutes('');
  };
  async function create(values) {
    try {
      await axios.post(
        `http://app-toy-vinic.herokuapp.com/api/brinquedo`,
        values,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      clearFields();
      setVisible(true);
      setMessageType(true);
      setMessage('Brinquedo cadastrado com sucesso!');
    } catch (error) {
      setMessage('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  const closeSnackbar = () => {
    setVisible(false);
  };

  const formValues = {
    name: name,
    price_per_minute: formattedPrice,
    minutes_price: minutes,
  };
  return (
    <S.Container style={{height: window.height / 1.25}}>
      <S.MainText>Cadastro de brinquedos</S.MainText>
      <S.AlignFields style={{paddingBottom: 10}}>
        <S.Label>Nome</S.Label>
        <S.Field value={name} onChangeText={e => setName(e)} />
      </S.AlignFields>
      <S.AlignFields style={{paddingBottom: 10}}>
        <S.Label>Preço</S.Label>
        <S.PriceMaskField
          value={price_per_minute}
          onChangeText={e => setPricePerMinute(e)}
        />
      </S.AlignFields>
      <S.AlignFields style={{paddingBottom: 10}}>
        <S.Label>Minutos</S.Label>
        <S.MinutesMaskField value={minutes} onChangeText={e => setMinutes(e)} />
      </S.AlignFields>

      <S.AlignButtons>
        <S.AlignButtons>
          <View style={{width: '30%'}}>
            <S.Button onPress={() => create(formValues)}>
              <S.ButtonText>Cadastrar</S.ButtonText>
            </S.Button>
          </View>
          <View style={{width: '30%'}}>
            <S.Button onPress={() => clearFields()}>
              <S.ButtonText>Limpar campos</S.ButtonText>
            </S.Button>
          </View>
        </S.AlignButtons>
      </S.AlignButtons>
      <Snackbar
        visible={visible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: messageType ? '#04B01B' : '#f00'}}
        duration={3000}>
        {message}
      </Snackbar>
    </S.Container>
  );
}
