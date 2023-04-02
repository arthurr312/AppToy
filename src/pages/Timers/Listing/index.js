/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../../context/User';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimerListing() {
  const {updateTimerTable, setUpdateTimerTable} = useContext(UserContext);
  const window = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState();
  async function listagem() {
    setLoading(prevState => !prevState);
    try {
      const response = await axios.get(
        'https://apptoydev.000webhostapp.com/api/timer',
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setData(response.data.timers);
    } catch (error) {
      console.log('Ocorreu um erro inesperado, tente novamente.');
    }
    setLoading(prevState => !prevState);
  }

  async function remocao(timer_id) {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/timer/${timer_id}`,
        timer_id,
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setUpdateTimerTable(prevState => !prevState);
      setOpenModal(false);
    } catch (error) {
      console.log('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  useEffect(() => {
    listagem();
  }, [updateTimerTable]);
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color="#003e9b"
          style={{
            height: window.height / 1.25,
            transform: [{scaleX: 4}, {scaleY: 4}],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : data.length === 0 ? (
        <View style={{height: window.height / 1.25, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/lupa.png')}
            style={{width: 200, height: 200, alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 21,
              color: '#192d4b',
              textAlign: 'center',
              fontWeight: 'bold',
              paddingTop: 10,
            }}>
            Ops, nenhum resultado encontrado :(
          </Text>
          <Text style={{fontSize: 17, color: '#838383', textAlign: 'center'}}>
            Parece que não há nenhum cronômetro cadastrado.
          </Text>
        </View>
      ) : (
        data.map(item => {
          let priceFixedDigits = item.total_price.toFixed(2);
          let convertedPrice = priceFixedDigits.replace('.', ',');
          let finalValue = convertedPrice.replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            '$1.',
          );
          return (
            <View key={item.id}>
              <S.DataContainer>
                <S.MainView>
                  <S.DataView>
                    <S.NameClient>{item.name_client}</S.NameClient>
                    <S.TimeValue>{item.time}</S.TimeValue>
                    <S.ValueText>R$ {finalValue}</S.ValueText>
                  </S.DataView>
                  <TouchableOpacity
                    style={{justifyContent: 'center'}}
                    onPress={() => {
                      setOpenModal(true);
                      setId(item.id);
                    }}>
                    <Icon name="ios-trash-outline" size={25} color="grey" />
                  </TouchableOpacity>
                </S.MainView>
              </S.DataContainer>
            </View>
          );
        })
      )}
      <View>
        <Modal transparent={true} visible={openModal}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View
              style={{
                backgroundColor: 'white',
                width: '80%',
                alignSelf: 'center',
                marginTop: 70,
                height: '20%',
                borderRadius: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 20,
                    color: 'black',
                  }}>
                  Tem certeza que deseja excluir?
                </Text>
                <S.AlignButtons>
                  <View style={{width: '30%'}}>
                    <S.Button onPress={() => remocao(id)}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Confirmar
                      </Text>
                    </S.Button>
                  </View>
                  <View style={{width: '40%'}}>
                    <S.CancelButton onPress={() => setOpenModal(false)}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'center',
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        Cancelar
                      </Text>
                    </S.CancelButton>
                  </View>
                </S.AlignButtons>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
