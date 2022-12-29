import React from "react";
import { View } from "react-native";
import * as S from './styles'
export const FinalDate = ({ finalDate }) => {
    return (
        <View style={{ width: '80%' }}>
            <S.Label>Data final:</S.Label>
            <S.DateField value={finalDate} />
        </View>
    )
}