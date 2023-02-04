import React from 'react';
import * as S from './styles';
import {useWindowDimensions, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {FilterNotFound} from '../FilterNotFound';

export const Table = ({financeData, setOpenModal, setShowWarningMessage}) => {
  const window = useWindowDimensions();
  return (
    <View>
      {financeData.length === 0 ? (
        <View
          style={{
            height: window.height / 1.25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FilterNotFound setOpenModal={setOpenModal} />
        </View>
      ) : (
        <>
          <S.ImageContainer>
            <S.Image source={require('../../../assets/arrowIcon.png')} />
            <View style={{width: '90%'}}>
              <S.MainText>Filtragem realizada com sucesso!</S.MainText>
            </View>
            <View style={{width: '80%'}}>
              <S.SecondaryText>
                Veja abaixo os dados referentes à sua pesquisa.{' '}
              </S.SecondaryText>
            </View>
          </S.ImageContainer>

          <DataTable style={{marginTop: 10}}>
            {financeData.map((item, index) => {
              let amountFixedDigits = item.montante.toFixed(2);
              let replacingForComma = amountFixedDigits.replace('.', ',');
              let finalValue = replacingForComma.replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                '$1.',
              );
              let formattedInitialDate = item.initial_date.split('-');
              let initialDateValue = `${formattedInitialDate[2]}/${formattedInitialDate[1]}/${formattedInitialDate[0]}`;
              let formattedFinalDate = item.final_date.split('-');
              let finalDateValue = `${formattedFinalDate[2]}/${formattedFinalDate[1]}/${formattedFinalDate[0]}`;
              return (
                <>
                  <DataTable.Header style={{backgroundColor: '#eff7ff'}}>
                    {/* <DataTable.Title style={{justifyContent: 'center'}}>
            Brinquedo
          </DataTable.Title> */}
                    <DataTable.Title style={{justifyContent: 'center'}}>
                      Data inicial
                    </DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center'}}>
                      Data final
                    </DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center'}}>
                      Clientes
                    </DataTable.Title>
                    <DataTable.Title style={{justifyContent: 'center'}}>
                      Lucro
                    </DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row key={index + 1}>
                    {/* <DataTable.Cell style={{justifyContent: 'flex-start'}}>
                John Cena
              </DataTable.Cell> */}
                    <DataTable.Cell style={{justifyContent: 'center'}}>
                      {initialDateValue}
                    </DataTable.Cell>
                    <DataTable.Cell style={{justifyContent: 'center'}}>
                      {finalDateValue}
                    </DataTable.Cell>
                    <DataTable.Cell style={{justifyContent: 'center'}}>
                      {item.qntClients}
                    </DataTable.Cell>
                    <DataTable.Cell style={{justifyContent: 'center'}}>
                      R$ {finalValue}
                    </DataTable.Cell>
                  </DataTable.Row>
                </>
              );
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
      )}
    </View>
  );
};
