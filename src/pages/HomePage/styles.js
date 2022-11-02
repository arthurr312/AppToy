import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
export const MainContainer = styled.View`
  background-color: #d9d9d9;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003E9B;
  align-items: center;
  justify-content: center;
`;

export const MainTitle = styled.Text`
  color: black;
  font-size: 20px;
  margin: 15px;
  font-weight: bold;
`;

export const AlignTitleAndIcon = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10%;
`;

export const TimerTextTitle = styled.Text`
  color: black;
  font-size: 20px;
  text-align: center;
`;

export const TimerContainer = styled.View`
  margin: 0 auto;
  margin-top: 5%;
  margin-bottom: 5%;
  height: 100px;
  width: 90%;
  background-color: #d9d9d9;
  border-radius: 5px;
  elevation: 6;
`;

export const Timer = styled.Text`
  color: black;
  font-size: 35px;
`;

export const GenericText = styled.Text`
  color: black;
  font-size: 20px;
`;

export const ButtonsText = styled.Text`
  color: white;
  font-size: 20px;
`;

export const IconContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

export const PlusIcon = styled(Icon).attrs({
  name: 'plus',
  size: 30,
  color: 'black',
})``;

export const AlignTimerItens = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const AlignIcons = styled.View`
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  width: 90%; 
  margin: 0 auto;
  padding-bottom: 20px;
`;

export const Field = styled.TextInput.attrs({
  placeholderTextColor: '#B2B2B2',
})`
  width: 60%;
  border: none;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  color: black;
`;
