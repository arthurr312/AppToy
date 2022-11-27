import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
import {Form as LibForm, Formik as LibFormik} from 'formik';

export const Formik = styled(LibFormik)``;
export const Form = styled(LibForm)``;
export const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

export const MainText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 26px;
  padding-bottom: 20px;
  color: black;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  text-align: center;
  color: white;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  min-width: 80px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003e9b;
  align-items: center;
  justify-content: center;
`;

export const Field = styled.TextInput.attrs({
  placeholderTextColor: '#B2B2B2',
  name: 'name',
})`
  width: 100%;
  border: 1px solid gray;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  color: black;
`;

export const PriceMaskField = styled(TextInputMask).attrs({
  type: 'money',
  name: 'price_per_minute',
})`
  width: 100%;
  border: 1px solid gray;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  color: black;
`;

export const MinutesMaskField = styled(TextInputMask).attrs({
  type: 'only-numbers',
  name: 'minutes_price',
})`
  width: 100%;
  border: 1px solid gray;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  color: black;
`;

export const AlignButtons = styled.View`
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Label = styled.Text`
  color: black;
  margin-left: 3px;
  font-size: 16px;
  padding-bottom: 3px;
`;

export const AlignFields = styled.View`
  width: 60%;
`;

export const ErrorMessage = styled.Text`
  margin-left: 5px;
  color: red;
  font-size: 14px;
`;