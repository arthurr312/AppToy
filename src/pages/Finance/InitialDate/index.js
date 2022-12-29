import React from "react";
import * as S from './styles';
import { Text, View } from "react-native";

export default function InitialDate({ initialDate }) {
    return (
        <View style={{width: '80%'}}>
            <S.Label>Data inicial:</S.Label>
            <S.DateField value={initialDate} />
        </View>
    )
}