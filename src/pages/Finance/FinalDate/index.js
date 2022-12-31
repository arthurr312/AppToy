import React from "react";
import * as S from './styles';
import { View } from "react-native";
import DatePicker from "react-native-date-picker";
import { formattedDate } from "../FormattedDate";
export const FinalDate = ({
    finalDate,
    setOpenFinal,
    openFinal,
    setFinalDate,
    setDate,
    date
}) => {
    return (
        <>
            <View style={{ width: '80%' }}>
                <S.Label>Data final:</S.Label>
                <S.DateField value={finalDate} />
            </View>
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
                    formattedDate(setFinalDate, date);
                }}
                cancelText="Cancelar"
                confirmText="Confirmar"
                onCancel={() => {
                    setOpenFinal(false)
                }}
                locale="pt"
            />
        </>
    )
}