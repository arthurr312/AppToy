import React from "react";
import { View } from "react-native";
import * as S from './styles';
export const InitialDate = ({ initialDate }) => {
    return (
        <View style={{ width: '80%' }}>
            <S.Label>Data inicial:</S.Label>
            <S.DateField value={initialDate} />
        </View>
    )
}