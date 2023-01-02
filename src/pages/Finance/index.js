import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import * as S from './styles';
import { DateInput } from './DateInput';
import { SelectInput } from './SelectInput';

export default function Finance() {
  const [data, setData] = React.useState([]);
  const [initialDate, setInitialDate] = React.useState();
  const [finalDate, setFinalDate] = React.useState();
  const [openInitial, setOpenInitial] = React.useState(false);
  const [openFinal, setOpenFinal] = React.useState(false);
  const [clusteringValue, setClusteringValue] = React.useState(null);
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
    <S.MainContainer>
      <View>
        <S.FinanceText>Finanças</S.FinanceText>
        <View style={{ width: '70%' }}>
          <DateInput
            dateValue={initialDate}
            setDateValue={setInitialDate}
            setOpen={setOpenInitial}
            open={openInitial}
          />
        </View>
        <View style={{ width: '70%' }}>
          <DateInput
            dateValue={finalDate}
            setDateValue={setFinalDate}
            setOpen={setOpenFinal}
            open={openFinal}
          />
        </View>
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
        <S.SelectFieldAlignMent>
          <SelectInput
            value={toyValue}
            setValue={setToyValue}
            setItems={setData}
            items={data}
            label="Escolha um brinquedo:"
          />
        </S.SelectFieldAlignMent>
        <S.AlignButton>
          <S.Button>
            <S.ButtonText>Filtrar</S.ButtonText>
          </S.Button>
        </S.AlignButton>
      </View>
    </S.MainContainer>
  );
}
