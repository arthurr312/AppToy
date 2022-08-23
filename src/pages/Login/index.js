import React, {useState, useContext} from "react";
import { View, Text, Image } from "react-native";
import {UserContext}  from '../../context/User'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import * as S from './styles';

export default function Login(){ 

  async function login() {
    try{
        await axios.post(`https://app-toy-vinic.herokuapp.com/api/login`, {email: userName, password: password });
        handleLogin();
    }catch(error){
      alert(error);
    }
}

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(UserContext);

  function handleLogin(){
    signIn(userName, password)
  }
  return(
    <S.Container>
      <Image source={require('../../assets/app_logo.png')} style={{width: 200,height:200}} />
     <S.Field placeholder="Nome" value={userName} onChangeText={(e) => setUserName(e)}/>
     <S.Field secureTextEntry={true} placeholder="Senha" value={password} onChangeText={(e) => setPassword(e)}/>
     <View style={{justifyContent: 'center'}} >
     <S.Button onPress={login}>
    <S.Text>Entrar</S.Text>
  </S.Button>
     </View>
    </S.Container>
  )
}