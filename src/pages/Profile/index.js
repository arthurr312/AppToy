import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as S from './styles';
export default function Profile() {
    return(
        <S.MainContainer>
            <S.ProfileContainer>

            </S.ProfileContainer>
            <S.OptionsContainer>
                <TouchableOpacity>
                <S.Option>
                    <Text style={{textAlign: 'center'}}>Diário</Text>
                </S.Option>
                </TouchableOpacity>
                <TouchableOpacity>
                <S.Option>
                    <Text style={{textAlign: 'center'}}>Semanal</Text>
                </S.Option>
                </TouchableOpacity>
                <TouchableOpacity>
                <S.Option>
                    <Text style={{textAlign: 'center'}}>Mensal</Text>
                </S.Option>
                </TouchableOpacity>
            </S.OptionsContainer>
        </S.MainContainer>
    )
}