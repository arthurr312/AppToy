/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerForm} from './TimerForm';

export default function Homepage({navigation}) {
  const window = useWindowDimensions();
  const [disableWarningMessage, setDisableWarningMessage] = useState(false);
  const [userName, setUserName] = useState();
  const [components, setComponents] = useState([]);
  React.useEffect(() => {
    const reloadScreen = navigation.addListener('focus', () => {
      setDisableWarningMessage(false);
      setComponents([]);
    });
    return reloadScreen;
  }, [navigation]);
  async function getUsername() {
    return setUserName(await AsyncStorage.getItem('@username'));
  }

  getUsername();

  function addComponent() {
    setDisableWarningMessage(true);
    setComponents([...components, <TimerForm />]);
  }

  return (
    <FlatList
      ListEmptyComponent={
        <>
          <View
            style={{
              height: window.height / 1.25,
              justifyContent: 'center',
              display: disableWarningMessage ? 'none' : 'flex',
            }}>
            <S.AlignImageAndLabel>
              <S.Image source={require('../../../assets/timerIcon.png')} />
              <S.MainText>
                Olá, {userName}, bem-vindo ao cadastro de cronômetros! :)
              </S.MainText>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: 5,
                  color: '#838383',
                  textAlign: 'center',
                  width: '100%',
                }}>
                <Text onPress={addComponent} style={{color: 'darkblue'}}>
                  Clique aqui
                </Text>{' '}
                para iniciar um cronômetro.
              </Text>
            </S.AlignImageAndLabel>
          </View>
          <S.AlignTitleAndIcon
            style={{display: disableWarningMessage ? 'flex' : 'none'}}>
            <S.TimerTextTitle>Adicionar novo cronômetro</S.TimerTextTitle>
            <TouchableOpacity
              onPress={addComponent}
              style={{
                marginLeft: '5%',
              }}>
              <S.PlusIcon />
            </TouchableOpacity>
          </S.AlignTitleAndIcon>
          <View style={{height: '100%', paddingBottom: '25%'}}>
            {components.map((i, index) => {
              return <TimerForm key={index + 1} />;
            })}
          </View>
        </>
      }
    />
  );
}
