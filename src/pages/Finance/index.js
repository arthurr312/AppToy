import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
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
    <View>
      <Button title="Open" onPress={() => setOpen(true)} />
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
      <Button title="clica" onPress={() => alert(JSON.stringify(formattedDate))} />
    </View>
  );
}
