import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Image, useWindowDimensions, Text, Modal } from 'react-native';
import * as S from './styles';
import { DateInput } from './DateInput';
import { SelectInput } from './SelectInput';

export default function Finance() {
  const window = useWindowDimensions();
  const [data, setData] = React.useState([]);
  const [initialDate, setInitialDate] = React.useState();
  const [finalDate, setFinalDate] = React.useState();
  const [openInitial, setOpenInitial] = React.useState(false);
  const [openFinal, setOpenFinal] = React.useState(false);
  const [clusteringValue, setClusteringValue] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [toyValue, setToyValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: 'Mês', value: 'month' },
    { label: 'Dia', value: 'day' },
    { label: 'Semana', value: 'year' },
  ]);

  async function listing() {
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

  React.useEffect(() => { listing() }, []);

  return (
    <ScrollView>
      <View >
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
            <Text onPress={() => setOpenModal(true)} style={{ color: 'darkblue' }}>Clique aqui</Text> para aplicar filtros e ter resultados mais detalhados.
          </Text>
        </S.AlignImageAndLabel>
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
                  setOpen={setOpenInitial}
                  open={openInitial}
                />
              </View>
              <View style={{ width: '100%' }}>
                <DateInput
                  dateValue={finalDate}
                  setDateValue={setFinalDate}
                  setOpen={setOpenFinal}
                  open={openFinal}
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
                <S.Button>
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
    </ScrollView>
  );
}
