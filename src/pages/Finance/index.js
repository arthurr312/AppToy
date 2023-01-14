import React, {useState} from 'react';
import * as S from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ScrollView, useWindowDimensions, Text, Modal} from 'react-native';
import {DateInput} from './DateInput';
import {SelectInput} from './SelectInput';
import {Table} from './Table';

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
    {label: 'Mês', value: 'month'},
    {label: 'Dia', value: 'day'},
    {label: 'Semana', value: 'year'},
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
      const filterResponse = response.data.brinquedos.map(item => ({
        ...item,
        value: item.id,
        label: item.name,
      }));
      setData(filterResponse);
    } catch (error) {
      alert('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  async function getFinanceData() {
    try {
      const response = await axios.get(
        `https://apptoydev.000webhostapp.com/api/financas/${initialAmericanDateFormat}/${finalAmericanDateFormat}/${toyValue}`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
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

  React.useEffect(() => {
    selectInputData();
  }, []);

  return (
    <ScrollView>
      <View style={{display: showWarningMessage === false ? 'none' : 'flex'}}>
        <S.AlignImageAndLabel style={{height: window.height / 1.25}}>
          <S.Image source={require('../../assets/financeImage.png')} />
          <S.MainText>Bem-vindo ao setor de finanças! :)</S.MainText>
          <Text style={{fontSize: 17, color: '#838383', textAlign: 'center'}}>
            <Text
              onPress={() => setOpenModal(true)}
              style={{color: 'darkblue'}}>
              Clique aqui
            </Text>{' '}
            para aplicar filtros e obter resultados mais detalhados.
          </Text>
        </S.AlignImageAndLabel>
      </View>
      <View>
        <Modal transparent={true} visible={openModal}>
          <S.OutSideModalBg>
            <S.ModalContainer>
              <S.FinanceText>Filtrar</S.FinanceText>
              <View style={{width: '100%'}}>
                <DateInput
                  dateValue={initialDate}
                  setDateValue={setInitialDate}
                  setAmericanDate={setInitialAmericanDateFormat}
                  setOpen={setOpenInitial}
                  open={openInitial}
                  label="Data inicial:"
                />
              </View>
              <View style={{width: '100%'}}>
                <DateInput
                  dateValue={finalDate}
                  setDateValue={setFinalDate}
                  setAmericanDate={setFinalAmericanDateFormat}
                  setOpen={setOpenFinal}
                  open={openFinal}
                  label="Data final:"
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <S.SelectFieldAlignMent>
                  <SelectInput
                    value={clusteringValue}
                    setValue={setClusteringValue}
                    setItems={setItems}
                    items={items}
                    dropDownDirection="TOP"
                    label="Agrupado por:"
                  />
                </S.SelectFieldAlignMent>
              </View>
              <View style={{justifyContent: 'center'}}>
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
            </S.ModalContainer>
          </S.OutSideModalBg>
        </Modal>
      </View>
      <View style={{display: showWarningMessage ? 'none' : 'flex'}}>
        <Table
          financeData={financeData}
          setOpenModal={setOpenModal}
          setShowWarningMessage={setShowWarningMessage}
        />
      </View>
    </ScrollView>
  );
}
