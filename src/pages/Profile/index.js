import React, {useState} from 'react';
import * as S from './styles';
import {FlatList, Image, Text, View, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Snackbar} from 'react-native-paper';
import {Formik} from 'formik';
import {ResetPassWordSchema} from '../../utils/validations';
import {useNavigation} from '@react-navigation/native';
export default function Profile() {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(true);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbarResponse, setSnackbarResponse] = useState(true);
  const [message, setMessage] = useState('');
  async function changePassword(values) {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/user/new-pass`,
        values,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setSnackbarResponse(true);
      setSnackbarVisibility(true);
      setMessage('Senha alterada com sucesso!');
      setTimeout(() => {
        AsyncStorage.removeItem('@token');
        AsyncStorage.removeItem('@username');
        navigation.navigate('App');
      }, 4000);
    } catch (error) {
      setSnackbarVisibility(true);
      setMessage('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  const closeSnackbar = () => setSnackbarVisibility(false);

  return (
    <S.MainContainer>
      <Formik
        initialValues={{
          oldPass: '',
          newPass: '',
        }}
        validateOnChange={false}
        validationSchema={ResetPassWordSchema}
        onSubmit={(values, {resetForm}) => {
          changePassword(values);
          resetForm({values: ''});
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View
            style={{
              height: window.height / 1.25,
              width: '100%',
              alignItems: 'center',
            }}>
            <S.SecondaryContainer>
              <View style={{width: '80%', paddingTop: 5}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 26,
                    color: 'black',
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  Redefinir senha
                </Text>
              </View>
              <S.ResetPasswordIconContainer>
                <Image
                  source={require('../../assets/reset.png')}
                  style={{width: 130, height: 130}}
                />
              </S.ResetPasswordIconContainer>
              <View style={{width: '85%'}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  A fim de{' '}
                  <Text style={{fontWeight: 'bold'}}>proteger sua conta</Text>,
                  tenha certeza que sua senha:
                </Text>
              </View>
              <View
                style={{
                  width: '70%',
                  padding: 10,
                }}>
                <FlatList
                  data={[
                    {value: 'Tem no mínimo 5 caracteres;'},
                    {value: 'Tem no máximo 15 caracteres.'},
                  ]}
                  renderItem={({item}) => {
                    return (
                      <View style={{marginBottom: 10}}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                          }}>{`\u2022 ${item.value}`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              <S.AlignFieldAndIcon>
                <S.Field
                  value={values.oldPass}
                  onBlur={handleBlur('oldPass')}
                  onChangeText={handleChange('oldPass')}
                  secureTextEntry={oldPasswordVisibility}
                  placeholder="Digite sua antiga senha"
                />
                {oldPasswordVisibility ? (
                  <Icon
                    name="eye-off-outline"
                    size={25}
                    color="grey"
                    style={{position: 'absolute', right: 15, top: 23}}
                    onPress={() =>
                      setOldPasswordVisibility(prevState => !prevState)
                    }
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    size={25}
                    color="grey"
                    style={{position: 'absolute', right: 15, top: 23}}
                    onPress={() =>
                      setOldPasswordVisibility(prevState => !prevState)
                    }
                  />
                )}
              </S.AlignFieldAndIcon>
              <View
                style={{
                  width: '80%',
                  display: errors.oldPass ? 'flex' : 'none',
                }}>
                <S.ErrorMessage>{errors.oldPass}</S.ErrorMessage>
              </View>
              <S.AlignFieldAndIcon>
                <S.Field
                  value={values.newPass}
                  onBlur={handleBlur('newPass')}
                  onChangeText={handleChange('newPass')}
                  secureTextEntry={newPasswordVisibility}
                  placeholder="Digite sua nova senha"
                />
                {newPasswordVisibility ? (
                  <Icon
                    name="eye-off-outline"
                    size={25}
                    color="grey"
                    style={{position: 'absolute', right: 15, top: 23}}
                    onPress={() =>
                      setNewPasswordVisibility(prevState => !prevState)
                    }
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    size={25}
                    color="grey"
                    style={{position: 'absolute', right: 15, top: 23}}
                    onPress={() =>
                      setNewPasswordVisibility(prevState => !prevState)
                    }
                  />
                )}
              </S.AlignFieldAndIcon>
              <View
                style={{
                  width: '80%',
                  display: errors.newPass ? 'flex' : 'none',
                }}>
                <S.ErrorMessage>{errors.newPass}</S.ErrorMessage>
              </View>
              <S.Button onPress={handleSubmit}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Confirmar
                </Text>
              </S.Button>
            </S.SecondaryContainer>
          </View>
        )}
      </Formik>
      <Snackbar
        visible={snackbarVisibility}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: snackbarResponse ? 'green' : 'red'}}
        duration={3000}>
        {message}
      </Snackbar>
    </S.MainContainer>
  );
}
