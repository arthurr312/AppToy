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
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  );
}
