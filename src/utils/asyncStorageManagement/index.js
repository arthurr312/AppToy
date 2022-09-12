import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async token => {
  await AsyncStorage.setItem('@token', token);
};

export const getAsyncStorage = async () => {
  return await AsyncStorage.getItem('@token');
};

export const removeAsyncStorage = async () => {
  await AsyncStorage.removeItem('@token');
};
