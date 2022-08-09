import React, {useState, useContext} from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import {UserContext}  from '../../context/User'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import * as S from './styles';

export default function Login(){ 

  // async function login(values) {
  //   await axios.post(`https://app-toy-vinic.herokuapp.com/api/login`, values);
  //   alert('deu bom'); 
  // }

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(UserContext);

  function handleLogin(){
    signIn(userName, password)
  }
  return(
    <S.Container>
     <S.Field placeholder="Nome" value={userName} onChangeText={(e) => setUserName(e)}/>
     <S.Field placeholder="Senha" value={password} onChangeText={(e) => setPassword(e)}/>
     <View style={{justifyContent: 'center'}} >
     <S.Button onPress={handleLogin}>
    <S.Text>Entrar</S.Text>
  </S.Button>
     </View>
    </S.Container>
  )
}