import React from "react";
import { View, Text } from "react-native";
import * as S from './styles';
export const ToyField = ({toyValue}) => {
    return (
        <View style={{ width: '80%' }}>
            <S.Label>Escolha um brinquedo:</S.Label>
            <S.DateField value={toyValue} />
        </View>
    )
};