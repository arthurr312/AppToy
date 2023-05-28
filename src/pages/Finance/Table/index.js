import React, {useContext} from 'react';
import * as S from './styles';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {FilterNotFound} from '../FilterNotFound';
import {UserContext} from '../../../context/User';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const Table = ({financeData, setOpenModal, setShowWarningMessage}) => {
  const {toy} = useContext(UserContext);
  const window = useWindowDimensions();
  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  return (
    <ScrollView>
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
                  Veja abaixo os dados referentes ao brinquedo{' '}
                  <S.SecondaryText style={{fontWeight: 'bold'}}>
                    {toy}
                  </S.SecondaryText>
                </S.SecondaryText>
              </View>
            </S.ImageContainer>

            <DataTable style={{marginTop: 10}}>
              <DataTable.Header style={{backgroundColor: '#eff7ff'}}>
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
              {financeData.map((item, index) => {
                let formattedInitialDate = item.initial_date.split('-');
                let initialDateValue = `${formattedInitialDate[2]}/${formattedInitialDate[1]}/${formattedInitialDate[0]}`;
                let formattedFinalDate = item.final_date.split('-');
                let finalDateValue = `${formattedFinalDate[2]}/${formattedFinalDate[1]}/${formattedFinalDate[0]}`;
                return (
                  <>
                    <DataTable.Row key={index + 1}>
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
                        {formatCurrency(item.montante)}
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
    </ScrollView>
  );
};
