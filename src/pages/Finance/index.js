import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as S from './styles';
import { FinalDate } from './FinalDate';
import { DateInput } from './DateInput';
import { ClusteringField } from './ClusteringField';
import { ToyField } from './ToyField';

export default function Finance() {
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [initialDate, setInitialDate] = React.useState();
  const [finalDate, setFinalDate] = React.useState();
  const [openInitial, setOpenInitial] = React.useState(false);
  const [openFinal, setOpenFinal] = React.useState(false);
  const [clusteringValue, setClusteringValue] = React.useState(null);
  const [toyValue, setToyValue] = React.useState(null);

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
      <View style={{ alignItems: 'center' }}>
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
        <S.AlignSelect>
          <S.SelectFieldAlignMent>
            <ClusteringField value={clusteringValue} setValue={setClusteringValue} />
          </S.SelectFieldAlignMent>
        </S.AlignSelect>
        <S.AlignSelect>
          <S.SelectFieldAlignMent>
            <ToyField value={toyValue} setValue={setToyValue} setItems={setData} items={data} />
          </S.SelectFieldAlignMent>
        </S.AlignSelect>
        <View style={{ alignItems: 'center' }}>
          <S.Button><Text style={{ fontSize: 16, fontWeight: 'bold' }}>Filtrar</Text></S.Button>
        </View>
      </View>
    </S.MainContainer>
  );
}
