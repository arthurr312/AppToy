/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {Teste} from './teste';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  useWindowDimensions,
  Modal,
} from 'react-native';
import * as S from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerForm} from './TimerForm';

export default function Homepage() {
  const window = useWindowDimensions();

  const [userName, setUserName] = useState();
  const [components, setComponents] = useState([]);

  async function getUsername() {
    return setUserName(await AsyncStorage.getItem('@username'));
  }

  getUsername();

  function addComponent() {
    setComponents([...components, <Teste />]);
  }

  return (
    <View style={{flex: 1, height: '100%'}}>
      <ScrollView>
        <View>
          <S.AlignImageAndLabel>
            <S.MainText>
              Olá, {userName}, bem-vindo ao cadastro de cronômetros! :)
            </S.MainText>
            <Text
              style={{
                fontSize: 17,
                color: '#838383',
                textAlign: 'center',
                width: '100%',
              }}>
              <Text onPress={addComponent} style={{color: 'darkblue'}}>
                Clique aqui
              </Text>{' '}
              para cadastrar e iniciar um cronômetro.
            </Text>
            {components.map((item, i) => {
              return (
                <>
                  <TimerForm key={i} />
                </>
              );
            })}
          </S.AlignImageAndLabel>
        </View>
      </ScrollView>
    </View>
  );
}
