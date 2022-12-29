import React from "react";
import { View } from "react-native";
import * as S from './styles';
export const MonthField = ({ monthValue }) => {
    return (
        <View style={{ width: '80%' }}>
            <S.Label>Agrupado por:</S.Label>
            <S.Field value={monthValue} />
        </View>
    )
}