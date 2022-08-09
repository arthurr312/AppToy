import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, SafeAreaView} from 'react-native';
import * as S from './styles';
import axios from 'axios';
export default function Listing() {
  const [data, setData] = useState([]);
  async function ListandoDados() {
    try {
      const response = await axios.get(
        `http://app-toy-vinic.herokuapp.com/api/timer/clients`,
      );
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
          <View>
            <S.DataContainer>
             <S.MainView>
             <S.DataView >
              <S.NameClient key={item.id}>
                {item.name_client}
              </S.NameClient>
              <S.TimeValue>{item.time}</S.TimeValue>
              </S.DataView>
              <S.ValueView>
              <S.ValueText>
                R$ 10,00
              </S.ValueText>
              </S.ValueView>
             </S.MainView>
            </S.DataContainer>
          </View>
        );
      })}
    </ScrollView>
  );
}
