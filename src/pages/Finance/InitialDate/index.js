import React from "react";
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import { formattedDate } from "../FormattedDate";
import * as S from './styles';
export const InitialDate = ({
    initialDate,
    setOpenInitial,
    openInitial,
    setInitialDate,
    setDate,
    date
}) => {
    return (
        <>
            <View style={{ width: '80%' }}>
                <S.Label>Data inicial:</S.Label>
                <S.DateField value={initialDate} />
            </View>
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
                    formattedDate(setInitialDate, date);
                }}
                cancelText="Cancelar"
                confirmText="Confirmar"
                onCancel={() => {
                    setOpenInitial(false)
                }}
                locale="pt"
            />
        </>
    )
}