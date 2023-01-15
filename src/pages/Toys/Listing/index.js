import React, {useState, useEffect} from 'react';
import * as S from './styles';
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
import Icon from 'react-native-vector-icons/Ionicons';
import PencilIcon from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ToyListing() {
  const window = useWindowDimensions();
  const [data, setData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [enableEdition, setEnableEdition] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [id, setId] = useState();
  const [price_per_minute, setPricePerMinute] = useState(`${0}, 00`);
  const [changeField, setChangeField] = useState(false);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');

  const clearFields = () => {
    setPricePerMinute(`${0}, 00`);
    setName('');
    setMinutes('');
  };
  async function listagem() {
    setLoading(prevState => !prevState);
    try {
      const response = await axios.get(
        `https://apptoydev.000webhostapp.com/api/brinquedo`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setData(response.data.brinquedos);
    } catch (error) {
      alert(error);
    }
    setLoading(prevState => !prevState);
  }

  async function remocao(id) {
    try {
      await axios.delete(
        `https://apptoydev.000webhostapp.com/api/brinquedo/${id}`,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setUpdateTable(prevState => !prevState);
      setOpenModal(false);
    } catch (error) {
      alert(error);
    }
  }

  async function edicao(id, values) {
    try {
      await axios.put(
        `https://apptoydev.000webhostapp.com/api/update/brinquedo/${id}`,
        values,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setUpdateTable(prevState => !prevState);
      clearFields();
      setEnableEdition(false);
      setChangeField(false);
    } catch (error) {
      alert('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  useEffect(() => {
    listagem();
  }, [updateTable]);
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
            Parece que não há nenhum brinquedo cadastrado.
          </Text>
        </View>
      ) : (
        data.map(item => {
          let formatted = price_per_minute.replace('R$', '');
          let formattedPrice = formatted.replace(',', '.');
          let priceFixedDigits = item.price_per_minute.toFixed(2);
          let convertedPrice = priceFixedDigits.replace('.', ',');
          const formValues = {
            name: name ? name : item.name,
            price_per_minute: changeField
              ? formattedPrice
              : item.price_per_minute,
            minutes_price: minutes ? minutes : item.minutes_price,
          };
          return (
            <View key={item.id}>
              <S.DataContainer>
                <S.MainView>
                  {selectedRowId === item.id && enableEdition ? (
                    <View style={{width: '100%'}}>
                      <S.Field
                        defaultValue={item.name}
                        onChangeText={e => setName(e)}
                      />
                      <S.PriceMaskField
                        value={`${convertedPrice}`}
                        onChangeText={e => {
                          setPricePerMinute(e);
                          setChangeField(true);
                        }}
                      />
                      <S.MinutesMaskField
                        value={`${item.minutes_price}`}
                        onChangeText={e => setMinutes(e)}
                      />
                      <S.AlignEditingButtons>
                        <S.EditingButton
                          style={{justifyContent: 'center'}}
                          onPress={() => edicao(selectedRowId, formValues)}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            Editar
                          </Text>
                        </S.EditingButton>
                        <S.CancelButton
                          onPress={() => setEnableEdition(false)}
                          style={{justifyContent: 'center'}}>
                          <Text style={{color: 'black', fontWeight: 'bold'}}>
                            Cancelar
                          </Text>
                        </S.CancelButton>
                      </S.AlignEditingButtons>
                    </View>
                  ) : (
                    <>
                      <S.DataView>
                        <S.NameClient>{item.name}</S.NameClient>
                        <S.ValueText>R$ {convertedPrice}</S.ValueText>
                        <S.TimeValue>
                          {item.minutes_price}{' '}
                          {item.minutes_price > 1 ? 'minutos' : 'minuto'}
                        </S.TimeValue>
                      </S.DataView>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          style={{justifyContent: 'center'}}
                          onPress={() => {
                            setOpenModal(true);
                            setId(item.id);
                          }}>
                          <Icon
                            name="ios-trash-outline"
                            size={25}
                            color="grey"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setEnableEdition(true);
                            setSelectedRowId(item.id);
                          }}
                          style={{justifyContent: 'center'}}>
                          <PencilIcon name="pencil" size={35} color="grey" />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
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
