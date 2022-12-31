import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FinanceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as S from './styles';
import { FinalDate } from './FinalDate';
import { InitialDate } from './InitialDate';
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
      <View>
        <S.FinanceText>Finanças</S.FinanceText>
        <S.AlignIcon>
          <FinanceIcon name='finance' size={90} color="#003E9B" />
        </S.AlignIcon>
        <S.FieldAlignment>
          <InitialDate
            initialDate={initialDate}
            setInitialDate={setInitialDate}
            setDate={setDate}
            date={date}
            setOpenInitial={setOpenInitial}
            openInitial={openInitial}
          />
          <View style={{ justifyContent: 'flex-end' }}>
            <S.IconButton onPress={() => setOpenInitial(true)}>
              <S.AlignCalendarIcon>
                <Icon name='calendar' size={20} />
              </S.AlignCalendarIcon>
            </S.IconButton>
          </View>
        </S.FieldAlignment>
        <S.FieldAlignment>
          <FinalDate
            finalDate={finalDate}
            setFinalDate={setFinalDate}
            date={date}
            setDate={setDate}
            setOpenFinal={setOpenFinal}
            openFinal={openFinal}
          />
          <View style={{ justifyContent: 'flex-end' }}>
            <S.IconButton onPress={() => setOpenFinal(true)}>
              <S.AlignCalendarIcon>
                <Icon name='calendar' size={20} />
              </S.AlignCalendarIcon>
            </S.IconButton>
          </View>
        </S.FieldAlignment>
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
      </View>
    </S.MainContainer>
  );
}
