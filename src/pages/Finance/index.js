import React, { useState } from 'react';
import * as S from './styles';
import { Button, Text, TouchableOpacity, View, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import FinanceIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-date-picker';
import {FinalDate} from './FinalDate';
import {InitialDate} from './InitialDate';
import { MonthField } from './MonthField';
export default function Finance() {
  const [date, setDate] = useState(new Date());
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [openInitial, setOpenInitial] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const formattingDate = (setDate, date) => {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1 == 10 || date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    setDate(`${day}/${month}/${year}`);
  }

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
        <S.FieldAlignment>
          <MonthField monthValue={'oiii'}/>
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => setOpenModal(true)} style={{ backgroundColor: '#003E9B', width: 30, height: 30, marginBottom: 7, borderRadius: 3 }}>
              <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='calendar' size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </S.FieldAlignment>
        {/* <S.FieldAlignment><S.Field /></S.FieldAlignment> */}
        {/* <S.Field /> */}
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
      <Modal transparent={true} visible={openModal}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                margin: 50,
                height: '20%',
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Tem certeza que deseja excluir?
                </Text>
                
              </View>
            </View>
          </View>
        </Modal>
    </S.MainContainer>
  );
}
