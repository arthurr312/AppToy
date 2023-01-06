import React from "react";
import * as S from './styles';
import { View } from "react-native";
import { DataTable } from "react-native-paper";

export const Table = ({ financeData, setOpenModal, setShowWarningMessage }) => {
    return (
        <>
            <S.ImageContainer>
                <S.Image source={require('../../../assets/arrowIcon.png')} />
                <View style={{ width: '90%' }}>
                    <S.MainText>Filtragem realizada com sucesso!</S.MainText>
                </View>
                <View style={{ width: '80%' }}>
                    <S.SecondaryText>Veja abaixo os dados referentes à sua pesquisa. </S.SecondaryText>
                </View>
            </S.ImageContainer>

            <DataTable style={{ marginTop: 10 }}>
                <DataTable.Header style={{ backgroundColor: '#eff7ff' }}>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Brinquedo</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Data inicial</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Data final</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Clientes</DataTable.Title>
                    <DataTable.Title style={{ justifyContent: 'center' }}>Lucro</DataTable.Title>

                </DataTable.Header>

                {financeData.map((item) => {
                    let amountFixedDigits = item.montante.toFixed(2);
                    let convertedAmount = amountFixedDigits.replace('.', ',');
                    return (
                        <DataTable.Row key={item}>
                            <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                                John Cena
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                                05/01/2022
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                                05/01/2022
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>
                                {item.qntClients}
                            </DataTable.Cell>
                            <DataTable.Cell style={{ justifyContent: 'center' }}>
                                R$ {convertedAmount}
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
            </DataTable>
            <S.AlignButtons>
                <S.Button onPress={() => setOpenModal(true)}>
                    <S.ButtonText>Filtrar novamente</S.ButtonText>
                </S.Button>
                <S.Button onPress={() => setShowWarningMessage(true)}>
                    <S.ButtonText>Voltar</S.ButtonText>
                </S.Button>
            </S.AlignButtons>
        </>
    );
}