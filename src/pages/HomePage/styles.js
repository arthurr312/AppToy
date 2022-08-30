import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const MainContainer = styled.View`
  background-color: #d9d9d9;
  width: 100%;
  height: 100%;
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
  min-height: 100px;
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
  min-height: 45%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
