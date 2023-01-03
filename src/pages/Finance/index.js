import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Image, useWindowDimensions, Text, Modal, ActivityIndicator } from 'react-native';
import * as S from './styles';
import { DateInput } from './DateInput';
import { SelectInput } from './SelectInput';
import { DataTable } from 'react-native-paper';
import { americanDateFormatting } from './FormattedDate';

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
      alert(JSON.stringify(response.data.toy));
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
        <ActivityIndicator size="large" color="#003E9B" style={{
            transform: [{scaleX: 4}, {scaleY: 4}],
            justifyContent: 'center',
            alignItems: 'center',
          }}/>
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
      
      {/* <DataTable style={{width: '100%'}}>
        <DataTable.Header>
          <DataTable.Title>Brinquedo</DataTable.Title>
          <DataTable.Title>Data inicial</DataTable.Title>
          <DataTable.Title numeric>Data final</DataTable.Title>
          <DataTable.Title numeric>Clientes</DataTable.Title>
          <DataTable.Title numeric>Lucro</DataTable.Title>

        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell style={{backgroundColor: 'blue'}}>John</DataTable.Cell>
          <DataTable.Cell style={{backgroundColor: 'red'}}>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell style={{backgroundColor: 'yellow'}} numeric>33</DataTable.Cell>
          <DataTable.Cell style={{backgroundColor: 'yellow'}} numeric>33</DataTable.Cell>
          <DataTable.Cell style={{backgroundColor: 'yellow'}} numeric>33</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>test@test.com</DataTable.Cell>
          <DataTable.Cell numeric>105</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Mei</DataTable.Cell>
          <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>23</DataTable.Cell>
        </DataTable.Row>

      </DataTable> */}
    </ScrollView>
  );
}
