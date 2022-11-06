import React, {useState, useEffect, useContext} from 'react';
import {Text, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {AsyncStorageContext} from '../../context/ManageAsyncStorage';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Listing() {
  const {getAsyncStorage} = useContext(AsyncStorageContext);
  const [data, setData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [id, setId] = useState();
  async function ListandoDados() {
    try {
      const response = await axios.get(
        `http://app-toy-vinic.herokuapp.com/api/timer`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setData(response.data.timers);
    } catch (error) {
      alert(error);
    }
  }

  async function DeletandoDados() {
    try {
      await axios.delete(`https://app-toy-vinic.herokuapp.com/api/timer/2`, {
        headers: {
          Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
        },
      });
      setUpdateTable(prevState => !prevState);
      console.log('deu bom');
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    ListandoDados();
  }, [updateTable]);
  return (
    <ScrollView>
      {data.map(item => {
        let formattedTime = item.time.substring(0, 5);
        let formattedPrice = item.total_price.replace('.', ',');
        return (
          <View key={item.id}>
            <S.DataContainer >
              <S.MainView>
                <S.DataView>
                  <S.NameClient>{item.name_client}</S.NameClient>
                  <S.TimeValue>{formattedTime}</S.TimeValue>
                </S.DataView>
                <S.ValueView>
                  <S.ValueText>R$ {formattedPrice}</S.ValueText>
                </S.ValueView>
                <TouchableOpacity onPress={DeletandoDados}>
                <Icon
                  name="ios-trash-outline"
                  size={25}
                  color="grey"
                />
                </TouchableOpacity>
                <S.ValueText>{id}</S.ValueText>
              </S.MainView>
            </S.DataContainer>
          </View>
        );
      })}
    </ScrollView>
  );
}
