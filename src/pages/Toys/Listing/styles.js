import styled from 'styled-components';

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
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003e9b;
  align-items: center;
  justify-content: center;
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
width: 70%;
margin: 0 auto;
flex-direction: row;
justify-content: space-around;
flex: 1;
align-items: center;
`;

export const MainView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DataView = styled.View`
  gap: 20px;
`;

export const ValueView = styled.View``;
