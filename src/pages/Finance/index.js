import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
export default function Finance() {
  const [date, setDate] = useState(new Date());
  console.log(date);
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        title={"Selecione a data"}
        open={open}
        date={date}
        is24hourSource="locale"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          alert(JSON.stringify(date))
        }}
        cancelText="Cancelar"
        confirmText="Confirmar"
        onCancel={() => {
          setOpen(false)
        }}
        locale="pt"
      />
    </View>
  );
}
