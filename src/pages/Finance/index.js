import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Image, useWindowDimensions, Text, Modal, ActivityIndicator, Button } from 'react-native';
import * as S from './styles';
import { DateInput } from './DateInput';
import { SelectInput } from './SelectInput';
import { DataTable } from 'react-native-paper';

export default function Finance() {
  const window = useWindowDimensions();
  const [data, setData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [openInitial, setOpenInitial] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);
  const [clusteringValue, setClusteringValue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [toyValue, setToyValue] = useState(null);
  const [showWarningMessage, setShowWarningMessage] = useState(true);
  const [initialAmericanDateFormat, setInitialAmericanDateFormat] = useState();
  const [finalAmericanDateFormat, setFinalAmericanDateFormat] = useState();

  const [items, setItems] = useState([
    { label: 'Mês', value: 'month' },
    { label: 'Dia', value: 'day' },
    { label: 'Semana', value: 'year' },
  ]);

  async function selectInputData() {
    try {
      const response = await axios.get(
        `https://apptoydev.000webhostapp.com/api/brinquedo`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      const filterResponse = response.data.brinquedos.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
      }))
      setData(filterResponse);
    } catch (error) {
      alert('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  async function getFinanceData() {
    try {
      const response = await axios.get(`https://apptoydev.000webhostapp.com/api/financas/${initialAmericanDateFormat}/${finalAmericanDateFormat}/${toyValue}`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },);
      setFinalDate();
      setInitialDate();
      setClusteringValue();
      setToyValue();
      setFinanceData(response.data.timers);
      setOpenModal(false);
      setShowWarningMessage(false);
    } catch (error) {
      alert(error);
    }
  }

  React.useEffect(() => { selectInputData() }, []);

  return (
    <ScrollView>
      <View style={{ display: showWarningMessage === false ? 'none' : 'flex' }}>
        <S.AlignImageAndLabel style={{ height: window.height / 1.25 }}>
          <Image
            source={require('../../assets/financeImage.png')}
            style={{ width: 250, height: 200, alignSelf: 'center' }}
          />
          <Text
            style={{
              fontSize: 21,
              color: '#192d4b',
              textAlign: 'center',
              fontWeight: 'bold',
              paddingTop: 10,
            }}>
            Bem-vindo ao setor de finanças! :)
          </Text>
          <Text style={{ fontSize: 17, color: '#838383', textAlign: 'center' }}>
            <Text onPress={() => setOpenModal(true)} style={{ color: 'darkblue' }}>Clique aqui</Text> para aplicar filtros e obter resultados mais detalhados.
          </Text>
        </S.AlignImageAndLabel>
        {/* <ActivityIndicator size="large" color="#003E9B" style={{
            transform: [{scaleX: 4}, {scaleY: 4}],
            justifyContent: 'center',
            alignItems: 'center',
          }}/> */}
      </View>
      <View>
        <Modal transparent={true} visible={openModal}>
          <View style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                margin: 50,
                padding: 20,
                minHeight: '20%',
                borderRadius: 10,
              }}>
              <S.FinanceText>Filtrar</S.FinanceText>
              <View style={{ width: '100%' }}>
                <DateInput
                  dateValue={initialDate}
                  setDateValue={setInitialDate}
                  setAmericanDate={setInitialAmericanDateFormat}
                  setOpen={setOpenInitial}
                  open={openInitial}
                  label="Data inicial"
                />
              </View>
              <View style={{ width: '100%' }}>
                <DateInput
                  dateValue={finalDate}
                  setDateValue={setFinalDate}
                  setAmericanDate={setFinalAmericanDateFormat}
                  setOpen={setOpenFinal}
                  open={openFinal}
                  label="Data final"
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <S.SelectFieldAlignMent>
                  <SelectInput
                    value={clusteringValue}
                    setValue={setClusteringValue}
                    setItems={setItems}
                    items={items}
                    dropDownDirection="TOP"
                    label="Agrupado por:"
                  />
                </S.SelectFieldAlignMent></View>
              <View style={{ justifyContent: 'center' }}>
                <S.SelectFieldAlignMent>
                  <SelectInput
                    value={toyValue}
                    setValue={setToyValue}
                    setItems={setData}
                    items={data}
                    label="Escolha um brinquedo:"
                  />
                </S.SelectFieldAlignMent>
              </View>
              <S.AlignButton>
                <S.Button onPress={() => getFinanceData()}>
                  <S.ButtonText>Filtrar</S.ButtonText>
                </S.Button>
                <S.CancelButton onPress={() => setOpenModal(false)}>
                  <S.CancelButtonText>Cancelar</S.CancelButtonText>
                </S.CancelButton>
              </S.AlignButton>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ display: showWarningMessage ? 'none' : 'flex' }}>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Image source={require('../../assets/arrowIcon.png')}
            style={{ width: 250, height: 120 }} />
          <View style={{ width: '90%' }}>
            <Text style={{ fontSize: 22, fontWeight: '400', textAlign: 'center', color: 'black', backgroundColor: 'transparent' }}>Filtragem realizada com sucesso!</Text>
          </View>
          <View style={{ width: '80%' }}>
            <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center' }}>Veja abaixo os dados referentes à sua pesquisa. </Text>
          </View>
        </View>

        <DataTable style={{marginTop: 10}}>
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
                <DataTable.Cell style={{ justifyContent: 'flex-start' }}>John Cena</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'flex-start' }}>05/01/2022</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'flex-start' }}>05/01/2022</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>{item.qntClients}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center' }}>R$ {convertedAmount}</DataTable.Cell>
              </DataTable.Row>
            )
          })}

        </DataTable>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 10 }}>
          <S.Button onPress={() => setOpenModal(true)}>
            <S.ButtonText>Filtrar novamente</S.ButtonText>
          </S.Button>
          <S.Button onPress={() => setShowWarningMessage(true)}>
            <S.ButtonText>Voltar</S.ButtonText>
          </S.Button>
        </View>
      </View>
    </ScrollView>
  );
}
