import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FinanceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { FinalDate } from './FinalDate';
import { InitialDate } from './InitialDate';
import { ClusteringField } from './ClusteringField';
import { ToyField } from './ToyField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Finance() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [openInitial, setOpenInitial] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [clusteringValue, setClusteringValue] = useState(null);
  const [toyValue, setToyValue] = useState(null);

  const formattingDate = (setDate, date) => {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1 == 10 || date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    setDate(`${day}/${month}/${year}`);
  }

  async function listagem() {
    try {
      const response = await axios.get(
        `https://apptoydev.000webhostapp.com/api/brinquedo`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      const filterResponse = response.data.brinquedos.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
      setData(filterResponse);
    } catch (error) {
      alert('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  useEffect(() => {listagem()}, []);

  return (
    <S.MainContainer>
      <View>
        <Text style={{ color: 'black', textAlign: 'center', margin: 10, fontSize: 30, fontWeight: 'bold' }}>Finanças</Text>
        <S.AlignIcon>
          <FinanceIcon name='finance' size={90} color="#003E9B" />
        </S.AlignIcon>
        <S.FieldAlignment>
          <InitialDate initialDate={initialDate} />
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => setOpenInitial(true)} style={{ backgroundColor: '#003E9B', width: 30, height: 30, marginBottom: 7, borderRadius: 3 }}>
              <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='calendar' size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </S.FieldAlignment>
        <S.FieldAlignment>
          <FinalDate finalDate={finalDate} />
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => setOpenFinal(true)} style={{ backgroundColor: '#003E9B', width: 30, height: 30, marginBottom: 7, borderRadius: 3 }}>
              <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='calendar' size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </S.FieldAlignment>

        <View style={{ width: '100%', alignSelf: 'flex-start', marginLeft: 10 }}>
          <S.SelectFieldAlignMent>
            <ClusteringField value={clusteringValue} setValue={setClusteringValue} />
          </S.SelectFieldAlignMent>
        </View>        
        <View style={{ width: '100%', alignSelf: 'flex-start', marginLeft: 10 }}>
          <S.SelectFieldAlignMent>
            <ToyField value={toyValue} setValue={setToyValue} setItems={setData} items={data}/>
          </S.SelectFieldAlignMent>
        </View>
      </View>
      {/* initial date */}
      <DatePicker
        modal
        mode='date'
        title={"Selecione a data"}
        open={openInitial}
        date={date}
        is24hourSource="locale"
        onConfirm={(date) => {
          setOpenInitial(false)
          setDate(date)
          formattingDate(setInitialDate, date);
        }}
        cancelText="Cancelar"
        confirmText="Confirmar"
        onCancel={() => {
          setOpenInitial(false)
        }}
        locale="pt"
      />
      {/* final date */}
      <DatePicker
        modal
        mode='date'
        title={"Selecione a data"}
        open={openFinal}
        date={date}
        is24hourSource="locale"
        onConfirm={(date) => {
          setOpenFinal(false)
          setDate(date)
          formattingDate(setFinalDate, date);
        }}
        cancelText="Cancelar"
        confirmText="Confirmar"
        onCancel={() => {
          setOpenFinal(false)
        }}
        locale="pt"
      />
    </S.MainContainer>
  );
}
