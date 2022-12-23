import React, {useState} from 'react';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Snackbar} from 'react-native-paper';
import {Text, useWindowDimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ToyFormSchema} from '../../../utils/validations';
import {Formik} from 'formik';
export default function Registering() {
  const window = useWindowDimensions();
  const [price_per_minute, setPricePerMinute] = useState('');
  const [messageType, setMessageType] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  let formatted = price_per_minute.replace('R$', '');
  let formattedPrice = formatted.replace(',', '.');
  async function create(values) {
    try {
      await axios.post(
        `https://apptoytemp.000webhostapp.com/api/brinquedo`,
        {...values, price_per_minute: formattedPrice},
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
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

  return (
    <View style={{height: window.height}}>
      <S.Container style={{height: window.height / 1.25}}>
        <Formik
          initialValues={{
            name: '',
            minutes_price: '',
          }}
          validationSchema={ToyFormSchema}
          validateOnChange={false}
          onSubmit={(values, {resetForm}) => {
            setPricePerMinute('');
            create(values);
            resetForm({values: ''});
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <>
              <S.MainText>Cadastro de brinquedos</S.MainText>
              <S.AlignFields style={{paddingBottom: 10}}>
                <S.Label>Nome</S.Label>
                <S.Field
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                />
                <S.ErrorMessage>{errors.name}</S.ErrorMessage>
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
                <S.MinutesMaskField
                  value={values.minutes_price}
                  onBlur={handleBlur('minutes_price')}
                  onChangeText={handleChange('minutes_price')}
                />
              </S.AlignFields>

              <S.AlignButtons>
                <S.AlignButtons>
                  <View style={{width: '50%'}}>
                    <S.Button onPress={handleSubmit}>
                      <S.ButtonText>Cadastrar</S.ButtonText>
                    </S.Button>
                  </View>
                </S.AlignButtons>
              </S.AlignButtons>
            </>
          )}
        </Formik>
      </S.Container>
      <View style={{height: '12%'}}>
        <Snackbar
          visible={visible}
          onDismiss={closeSnackbar}
          action={{
            label: <Icon name="ios-close-outline" color="#fff" size={25} />,
          }}
          style={{
            alignItems: 'center',
            backgroundColor: messageType ? '#04B01B' : '#f00',
          }}
          duration={3000}>
          {message}
        </Snackbar>
      </View>
    </View>
  );
}
