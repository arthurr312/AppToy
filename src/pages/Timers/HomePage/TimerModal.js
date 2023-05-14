import React from 'react';
import {Modal, View, Text} from 'react-native';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
export const TimerModal = ({
  openModal,
  timerData,
  setOpenModal,
  setIsLoading,
  setShowComponent,
}) => {
  const formatCurrency = value => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleCloseModal = () => {
    setIsLoading(false);
    setShowComponent(false);
    setOpenModal(false);
  };
  return (
    <Modal transparent={true} visible={openModal}>
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
              alignSelf: 'flex-end',
              margin: 8,
            }}>
            <CloseIcon
              onPress={handleCloseModal}
              name="close"
              color="#5A5A5A"
              size={25}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 4}}>
            <Text style={{color: '#555', fontWeight: 'bold', fontSize: 16}}>
              Nome do cliente:{' '}
              <Text style={{color: '#111', fontWeight: 'bold', fontSize: 16}}>
                {timerData && timerData.name_client}
              </Text>
            </Text>
            <Text style={{color: '#555', fontWeight: 'bold', fontSize: 16}}>
              Preço final:{' '}
              <Text style={{color: '#111', fontWeight: 'bold', fontSize: 16}}>
                {formatCurrency(timerData && timerData.total_price)}
              </Text>
            </Text>
            <Text style={{color: '#555', fontWeight: 'bold', fontSize: 16}}>
              Tempo total:{' '}
              <Text style={{color: '#111', fontWeight: 'bold', fontSize: 16}}>
                {timerData && timerData.time}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
