import React, { useState, useEffect, useContext } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import { UserContext } from '../../context/User';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const { signIn, setIsLogged, isLogged } = useContext(UserContext);
  const navigation = useNavigation();
  let logged;
  async function getCurrentState() {
    logged = await AsyncStorage.getItem('@initial_screen');
    setIsLogged(logged);
  }

  React.useEffect(() => {
    getCurrentState();
  }, []);
  async function login() {
    setLoading(prevState => !prevState);
    try {
      const response = await axios.post(
        `https://apptoydev.000webhostapp.com/api/login`,
        {
          name: userName,
          password: password,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      signIn(userName, password);
      await AsyncStorage.setItem('@token', response.data.access_token);
      await AsyncStorage.setItem('@username', userName);
      await AsyncStorage.setItem('@initial_screen', 'true');
      logged = await AsyncStorage.getItem('@initial_screen');
      setIsLogged(logged);
      setUserName('');
      setPassword('');
    } catch (error) {
      setErrorMessage('Dados inválidos, tente novamente.');
      setVisible(true);
    }
    setLoading(prevState => !prevState);
  }

  const closeSnackbar = () => setVisible(false);

  return (
    <S.Container>
      <Image
        source={require('../../assets/app_logo.png')}
        style={{ width: 200, height: 200 }}
      />
      <S.Field
        placeholder="Nome"
        value={userName}
        onChangeText={e => setUserName(e)}
      />
      <View style={{ flexDirection: 'row' }}>
        <S.PasswordField
          secureTextEntry={visiblePassword}
          placeholder="Senha"
          value={password}
          onChangeText={e => setPassword(e)}
        />
        {visiblePassword ? (
          <Icon
            name="eye-off-outline"
            size={25}
            color="grey"
            style={{ position: 'absolute', right: 15, top: 20 }}
            onPress={() => setVisiblePassword(prevState => !prevState)}
          />
        ) : (
          <Icon
            name="eye-outline"
            size={25}
            color="grey"
            style={{ position: 'absolute', right: 15, top: 20 }}
            onPress={() => setVisiblePassword(prevState => !prevState)}
          />
        )}
      </View>

      <View style={{ justifyContent: 'center' }}>
        <S.Button onPress={login}>
          {loading ? (
            <View>
              <ActivityIndicator size="small" color="#fff" />
            </View>
          ) : (
            <View>
              <S.Text>Entrar</S.Text>
            </View>
          )}
        </S.Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{ backgroundColor: '#010E3F' }}
        duration={3000}>
        {errorMessage}
      </Snackbar>
    </S.Container>
  );
}
