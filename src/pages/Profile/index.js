import React, { useState } from 'react';
import { FlatList, Image, Text, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as S from './styles';
import { Formik } from 'formik';
import { ResetPassWordSchema } from '../../utils/validations';
export default function Profile() {
  const window = useWindowDimensions();
  const [oldPasswordVisibility, setOldPasswordVisibility] = useState(true);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);

  async function changePassword(values) {
    try {
      await axios.post(`https://apptoydev.000webhostapp.com/api/user/new-pass`, values, {
        headers: {
          Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
        },
      },);
      alert('deu bom');
    } catch (error) {
      alert(error);
    }
  }
  return (
    <S.MainContainer>
      <Formik
        initialValues={{
          oldPass: '',
          newPass: '',
        }}
        validateOnChange={false}
        validationSchema={ResetPassWordSchema}
        onSubmit={(values, { resetForm }) => {
          changePassword(values);
          resetForm({ values: '' });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <View style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: "90%",
              minHeight: "60%",
              paddingBottom: 15,
              backgroundColor: "white",
              elevation: 6,
              borderRadius: 7,
            }}>
              <View style={{ width: '80%', paddingTop: 5 }}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 26,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 15
                }}>
                  Redefinir senha
                </Text>
              </View>
              <S.ResetPasswordIconContainer>
                <Image
                  source={require('../../assets/reset.png')}
                  style={{ width: 130, height: 130 }}
                />
              </S.ResetPasswordIconContainer>
              <View style={{ width: '80%' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>
                  A fim de <Text style={{ fontWeight: 'bold' }}>proteger sua conta</Text>, tenha certeza que sua senha:
                </Text>
              </View>
              <View style={{
                width: '70%', padding: 10
              }}>
                <FlatList
                  data={[
                    { value: 'Tem no mínimo 5 caracteres;' },
                    { value: 'Tem no máximo 15 caracteres.' },
                  ]}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>{`\u2022 ${item.value}`}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <S.Field
                  value={values.oldPass}
                  onBlur={handleBlur('oldPass')} onChangeText={handleChange('oldPass')}
                  secureTextEntry={oldPasswordVisibility}
                  placeholder="Digite sua senha antiga"
                />
                {oldPasswordVisibility ? (
                  <Icon
                    name="eye-off-outline"
                    size={25}
                    color="grey"
                    style={{ position: 'absolute', right: 15, top: 23 }}
                    onPress={() => setOldPasswordVisibility(prevState => !prevState)}
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    size={25}
                    color="grey"
                    style={{ position: 'absolute', right: 15, top: 23 }}
                    onPress={() => setOldPasswordVisibility(prevState => !prevState)}
                  />
                )}
              </View>
              <View style={{ width: '80%' }}>
                <S.ErrorMessage>{errors.oldPass}</S.ErrorMessage>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <S.Field
                  value={values.newPass}
                  onBlur={handleBlur('newPass')} onChangeText={handleChange('newPass')}
                  secureTextEntry={newPasswordVisibility}
                  placeholder="Digite sua nova senha"
                />
                {newPasswordVisibility ? (
                  <Icon
                    name="eye-off-outline"
                    size={25}
                    color="grey"
                    style={{ position: 'absolute', right: 15, top: 23 }}
                    onPress={() => setNewPasswordVisibility(prevState => !prevState)}
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    size={25}
                    color="grey"
                    style={{ position: 'absolute', right: 15, top: 23 }}
                    onPress={() => setNewPasswordVisibility(prevState => !prevState)}
                  />
                )}
              </View>
              <View style={{ width: '80%' }}>
                <S.ErrorMessage>{errors.newPass}</S.ErrorMessage>
              </View>
              <S.Button onPress={handleSubmit}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Confirmar
                </Text>
              </S.Button>
            </View>
          </>
        )}
      </Formik>

    </S.MainContainer>
  );
}
