import React, {useState} from 'react';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  useWindowDimensions,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {ToyFormSchema} from '../../../utils/validations';
import {Formik} from 'formik';
export default function Registering() {
  const window = useWindowDimensions();
  const [price_per_minute, setPricePerMinute] = useState('');
  const [loading, setLoading] = useState(false);
  // const [messageType, setMessageType] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const [message, setMessage] = useState('');
  let formatted = price_per_minute.replace('R$', '');
  let formattedPrice = formatted.replace(',', '.');
  async function create(values) {
    setLoading(prevState => !prevState);
    Keyboard.dismiss();
    try {
      await axios.post(
        'https://apptoydev.000webhostapp.com/api/brinquedo',
        {...values, price_per_minute: formattedPrice},
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      // setVisible(true);
      // setMessageType(true);
      // setMessage('Brinquedo cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
      //setMessage('Ocorreu um erro inesperado, tente novamente.');
    }
    setLoading(prevState => !prevState);
  }

  // const closeSnackbar = () => {
  //   setVisible(false);
  // };

  return (
    <View style={{height: window.height}}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color="#003e9b"
          style={{
            height: window.height / 1.25,
            transform: [{scaleX: 4}, {scaleY: 4}],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <S.Container style={{height: window.height / 1.25}}>
          <Formik
            initialValues={{
              name: '',
              minutes_price: '',
            }}
            validationSchema={ToyFormSchema}
            validateOnChange={false}
            onSubmit={values => {
              setPricePerMinute('');
              create(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <S.SecondaryContainer>
                <S.MainText>Cadastro de brinquedos</S.MainText>
                <S.AlignFields style={{paddingBottom: 10}}>
                  <S.Label>Nome</S.Label>
                  <S.Field
                    value={values.name}
                    onBlur={handleBlur('name')}
                    onChangeText={handleChange('name')}
                    blurOnSubmit={true}
                  />
                  <View style={{display: errors.name ? 'flex' : 'none'}}>
                    {errors && <S.ErrorMessage>{errors.name}</S.ErrorMessage>}
                  </View>
                </S.AlignFields>

                <S.AlignFields style={{paddingBottom: 10}}>
                  <S.Label>Preço</S.Label>
                  <S.PriceMaskField
                    value={price_per_minute}
                    onChangeText={e => setPricePerMinute(e)}
                    blurOnSubmit={true}
                  />
                </S.AlignFields>
                <S.AlignFields style={{paddingBottom: 10}}>
                  <S.Label>Minutos</S.Label>
                  <S.MinutesMaskField
                    value={values.minutes_price}
                    onBlur={handleBlur('minutes_price')}
                    onChangeText={handleChange('minutes_price')}
                    blurOnSubmit={true}
                  />
                  <View
                    style={{display: errors.minutes_price ? 'flex' : 'none'}}>
                    {errors && (
                      <S.ErrorMessage>{errors.minutes_price}</S.ErrorMessage>
                    )}
                  </View>
                </S.AlignFields>

                <S.AlignButtons>
                  <S.AlignButtons>
                    <TouchableWithoutFeedback
                      onPress={Keyboard.dismiss}
                      accessible={true}>
                      <View style={{width: '50%'}}>
                        <S.Button onPress={handleSubmit}>
                          <S.ButtonText>Cadastrar</S.ButtonText>
                        </S.Button>
                      </View>
                    </TouchableWithoutFeedback>
                  </S.AlignButtons>
                </S.AlignButtons>
              </S.SecondaryContainer>
            )}
          </Formik>
        </S.Container>
      )}

      {/* <View style={{height: '8%'}}>
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
      </View> */}
    </View>
  );
}
