import React, {useState, useEffect, useContext} from 'react';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import { AsyncStorageContext } from '../../context/ManageAsyncStorage';
import * as S from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Listing() {
  const {getAsyncStorage} = useContext(AsyncStorageContext);
  const [data, setData] = useState([]);
  async function ListandoDados() {
    try {
      const response = await axios.get(
        `http://app-toy-vinic.herokuapp.com/api/timer/clients`, {
          headers: {Authorization: 'Bearer' + await AsyncStorage.getItem("@token")},
      });
      setData(response.data.times_owner);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    ListandoDados();
  }, []);
  return (
    <ScrollView>
      {data.map(item => { 
        return (
          <View key={item.id}>
            <S.DataContainer>
              <S.MainView>
                <S.DataView>
                  <S.NameClient>{item.name_client}</S.NameClient>
                  <S.TimeValue>{item.time}</S.TimeValue>
                </S.DataView>
                <S.ValueView>
                  <S.ValueText>R$ {item.total_price}</S.ValueText>
                </S.ValueView>
              </S.MainView>
            </S.DataContainer>
          </View>
        );
      })}
    </ScrollView>
  );
}
