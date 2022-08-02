import React, {useState, useContext} from "react";
import { View, TextInput } from "react-native";
import { Button } from 'react-native-paper';
import UserContext  from './context/User'
import * as S from './styles';

export default function App(){
  const {userName, setUserName, password, setPassword} = useContext(UserContext);
  return(
    <S.Container>
     <S.Field placeholder="Nome" value={userName} onChange={(event) => setUserName(event.target.value)}/>
     <S.Field placeholder="Senha" value={password} onChange={(event) => setPassword(event.target.value)}/>
     <View style={{justifyContent: 'center'}} >
     <Button>
    Press me
  </Button>
     </View>
    </S.Container>
  )
}