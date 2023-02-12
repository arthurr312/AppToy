/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState} from 'react';
import {ScrollView, LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimerForm} from './TimerForm';
import {TimerComponent} from './TimerComponent';

export default function Homepage({navigation}) {
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
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  async function getUsername() {
    return setUserName(await AsyncStorage.getItem('@username'));
  }

  getUsername();

  function addComponent() {
    setDisableWarningMessage(true);
    setComponents([...components, <TimerForm />]);
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      <TimerComponent
        addComponent={addComponent}
        components={components}
        disableWarningMessage={disableWarningMessage}
        userName={userName}
      />
    </ScrollView>
  );
}
