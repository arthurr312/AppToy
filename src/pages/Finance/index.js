import React, { useState } from 'react';
import * as S from './styles';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import FinalDate from './FinalDate';
import InitialDate from './InitialDate';
export default function Finance() {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState();
  const [open, setOpen] = useState(false);

  const formattingDate = (date) => {
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1 == 10 || date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    setFormattedDate(`${day}/${month}/${year}`);
  }

  return (
    <>
      <S.FieldAlignment>
        <InitialDate initialDate={formattedDate} />
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => setOpen(true)} style={{ backgroundColor: '#003E9B', width: 30, height: 30, marginBottom: 5, borderRadius: 3 }}>
            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name='calendar' size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </S.FieldAlignment>
      <FinalDate />
      <DatePicker
        modal
        mode='date'
        title={"Selecione a data"}
        open={open}
        date={date}
        is24hourSource="locale"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          formattingDate(date);
        }}
        cancelText="Cancelar"
        confirmText="Confirmar"
        onCancel={() => {
          setOpen(false)
        }}
        locale="pt"
      />
    </>
  );
}
