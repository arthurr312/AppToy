import React from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from 'react-native-vector-icons/AntDesign';
import { americanDateFormatting, formattedDate } from "../FormattedDate";
import * as S from './styles';
export const DateInput = ({
    dateValue,
    setDateValue,
    setAmericanDate,
    setOpen,
    open,
    label
}) => {
    const [date, setDate] = React.useState(new Date());
    return (
        <>
            <View>
                <S.Label>{label}</S.Label>
                <View style={{ flexDirection: 'row' }}>
                    <S.DateField value={dateValue} />
                    <Icon
                        onPress={() => setOpen(true)}
                        name='calendar' size={25}
                        color="black"
                        style={{ position: 'absolute', right: 10, top: 15 }} />
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
                    americanDateFormatting(setAmericanDate, date);
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