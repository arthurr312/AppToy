import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import * as S from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ToyListing() {
  const window = useWindowDimensions();
  const [data, setData] = useState([]);
  const [updateTable, setUpdateTable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState();
  async function listagem() {
    try {
      const response = await axios.get(
        `http://app-toy-vinic.herokuapp.com/api/brinquedo`,
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
  }

  async function remocao(id) {
    try {
      await axios.delete(`http://app-toy-vinic.herokuapp.com/api/brinquedo/${id}`, {
        headers: {
          Authorization: 'Bearer' + (await AsyncStorage.getItem('@token')),
        },
      });
      setUpdateTable(prevState => !prevState);
      setOpenModal(false);
      setVisible(true);
    } catch (error) {
      alert('ta dando ruim');
    }
  }

  const closeSnackbar = () => {
    setVisible(false);
  };

  useEffect(() => {
    listagem();
  }, [updateTable]);
  return (
    <ScrollView>
      {data.length === 0 ? (
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
          return (
            <View key={item.id}>
              <S.DataContainer>
                <S.MainView>
                  <S.DataView>
                    <S.NameClient>{item.name}</S.NameClient>
                    <S.ValueText>R$ {item.price_per_minute},00</S.ValueText>
                    <S.TimeValue>{item.minutes_price} minutos</S.TimeValue>
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
                          color: 'white',
                        }}>
                        Sim
                      </Text>
                    </S.Button>
                  </View>
                  <View style={{width: '30%'}}>
                    <S.Button onPress={() => setOpenModal(false)}>
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: 'center',
                          color: 'white',
                        }}>
                        Cancelar
                      </Text>
                    </S.Button>
                  </View>
                </S.AlignButtons>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={closeSnackbar}
        action={{
          label: <Icon name="ios-close-outline" color="#fff" size={25} />,
        }}
        style={{backgroundColor: '#04B01B'}}
        duration={3000}>
        Brinquedo removido com sucesso!
      </Snackbar>
    </ScrollView>
  );
}
