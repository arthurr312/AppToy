import React from "react";
import * as S from './styles';
import { Text, View } from "react-native";

export default function InitialDate({ initialDate }) {
    return (
        <View>
            <S.Label>Data inicial:</S.Label>
            <S.DateField value={initialDate} placeholder="Data inicial" />
        </View>
    )
}