import React, {useState, useContext} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
import {UserContext}  from '../../context/User'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [visiblePassword, setVisiblePassword] = useState(true);
  const {signIn} = useContext(UserContext);

  function handleLogin(){
    signIn(userName, password)
  }
  return(
    <S.Container>
      <Image source={require('../../assets/app_logo.png')} style={{width: 200,height:200}} />
     <S.Field placeholder="Nome" value={userName} onChangeText={(e) => setUserName(e)}/>
     <View style={{flexDirection: 'row'}}>
     <S.Field secureTextEntry={visiblePassword} placeholder="Senha" value={password} onChangeText={(e) => setPassword(e)} />
     {visiblePassword ? (
      <Icon name="eye-off-outline" size={25} color="grey" style={{position:'absolute', right:15, top: 20}} onPress={() => setVisiblePassword(prevState => !prevState)}/>
     ) : (
      <Icon name="eye-outline" size={25} color="grey" style={{position:'absolute', right:15, top: 20}} onPress={() => setVisiblePassword(prevState => !prevState)}/>  
     )}
     </View>

     <View style={{justifyContent: 'center'}} >
     <S.Button onPress={login}>
    <S.Text>Entrar</S.Text>
  </S.Button>
     </View>
    </S.Container>
  )
}