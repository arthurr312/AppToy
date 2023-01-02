import React from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/AntDesign';
import { formattedDate } from "../FormattedDate";
import * as S from './styles';
export const DateInput = ({
    dateValue,
    setDateValue,
    setOpen,
    open,
}) => {
    const [date, setDate] = React.useState(new Date());
    return (
        <>
            <View>
                <S.Label>Data inicial:</S.Label>
                <View style={{ flexDirection: 'row' }}>
                    <S.DateField value={dateValue} />
                    <Icon
                        onPress={() => setOpen(true)}
                        name='calendar' size={25}
                        color="black"
                        style={{ position: 'absolute', right: 10, top: 20 }} />
                </View>
            </View>
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
                    formattedDate(setDateValue, date);
                }}
                cancelText="Cancelar"
                confirmText="Confirmar"
                onCancel={() => {
                    setOpen(false)
                }}
                locale="pt"
            />
        </>
    )
}