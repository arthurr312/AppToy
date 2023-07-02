import {TextInputMask} from 'react-native-masked-text';
import styled from 'styled-components';

export const Field = styled(TextInputMask).attrs({
  type: 'only-numbers',
})`
  width: 70%;
  border: 1px solid black;
  background: transparent;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  color: black;
`;

export const Label = styled.Text`
  color: black;
  width: 70%;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #003e9b;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;
