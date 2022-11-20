import styled from 'styled-components';
import {TextInputMask} from 'react-native-masked-text';
export const DataContainer = styled.View`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  width: 90%;
  background-color: white;
  border-radius: 5px;
  elevation: 6;
  gap: 10px;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  min-width: 85px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003e9b;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

export const EditingButton = styled.TouchableOpacity`
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003e9b;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled(Button)`
  width: 80px;
  background-color: transparent;
`;

export const NameClient = styled.Text`
  color: black;
  font-size: 20px;
`;

export const TimeValue = styled(NameClient)`
  font-size: 18px;
`;
export const ValueText = styled(TimeValue)``;

export const AlignButtons = styled.View`
  width: 55%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-around;
  flex: 1;
  align-items: center;
`;

export const AlignEditingButtons = styled.View`
  width: 40%;
  margin: 0 auto;
  margin-top: 5px;
  flex-direction: row;
  justify-content: space-around;
`;

export const MainView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DataView = styled.View`
  gap: 20px;
`;

export const ValueView = styled.View``;

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
  margin-top: 10px;
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
  margin-top: 10px;
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
  margin-top: 10px;
  color: black;
`;
