import React, {useState, useEffect, useContext} from 'react';
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
import {UserContext} from '../../../context/User';
import {Snackbar} from 'react-native-paper';
export default function ToyListing() {
  const {updateToyTable, setUpdateToyTable} = useContext(UserContext);
  const window = useWindowDimensions();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [enableEdition, setEnableEdition] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [id, setId] = useState();
  const [price_per_minute, setPricePerMinute] = useState(`${0}, 00`);
  const [changeField, setChangeField] = useState(false);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState('');
  const [dataVisible, setDataVisible] = useState(false);
  const [dataMessage, setDataMessage] = useState('');
  const [removeMessage, setRemoveMessage] = useState('');
  const [removeVisible, setRemoveVisible] = useState(false);
  const clearFields = () => {
    setPricePerMinute(`${0}, 00`);
    setName('');
    setMinutes('');
  };
  async function listagem() {
    setLoading(prevState => !prevState);
    try {
      const response = await axios.get(
        'https://apptoydev.000webhostapp.com/api/brinquedo',
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setData(response.data.brinquedos);
    } catch (error) {
      setDataMessage('Ops, ocorreu um erro inesperado, recarregue o app.');
    }
    setLoading(prevState => !prevState);
  }

  async function remocao(toy_id) {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/brinquedo/${toy_id}`,
        toy_id,
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setRemoveMessage('Cronômetro removido com sucesso!');
      setUpdateToyTable(prevState => !prevState);
      setOpenModal(false);
    } catch (error) {
      alert(error);
    }
  }

  async function edicao(edit_id, values) {
    try {
      await axios.post(
        `https://apptoydev.000webhostapp.com/api/update/brinquedo/${edit_id}`,
        values,
        {
          headers: {
            Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
          },
        },
      );
      setUpdateToyTable(prevState => !prevState);
      clearFields();
      setEnableEdition(false);
      setChangeField(false);
    } catch (error) {
      console.log('Ocorreu um erro inesperado, tente novamente.');
    }
  }

  const closeSnackbar = () => {
    setDataVisible(false);
    setRemoveVisible(false);
  };

  useEffect(() => {
    listagem();
  }, [updateToyTable]);
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
          let priceFixedDigits = item?.price_per_minute?.toFixed(2);
          let convertedPrice = priceFixedDigits?.replace('.', ',');
          let finalValue = convertedPrice?.replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            '$1.',
          );
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
                        value={`${finalValue}`}
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
                        <S.ValueText>R$ {finalValue ?? '-'}</S.ValueText>
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
      <Snackbar
        visible={dataVisible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: '#010E3F'}}
        duration={3000}>
        {dataMessage}
      </Snackbar>
      <Snackbar
        visible={removeVisible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: '#010E3F'}}
        duration={3000}>
        {removeMessage}
      </Snackbar>
    </ScrollView>
  );
}
