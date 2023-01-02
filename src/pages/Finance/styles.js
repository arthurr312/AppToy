import styled from 'styled-components';

export const MainContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: #D9D9D9;
`;

export const SecondaryContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  min-height: 60%;
  padding-bottom: 15px;
  background-color: white;
  elevation: 6;
  border-radius: 7px;
`;

export const Field = styled.TextInput`
  width: 80%;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  padding-top: 7px;
  color: black;
`;

export const FieldAlignment = styled.View`
  margin: 0 auto;
  flex-direction: row; 
  width: 70%; 
  justify-content: space-evenly; 
`;

export const AlignIcon = styled.View`
  align-self: center;
  margin-top: -5px;
`;

export const FinanceText = styled.Text`
  color: black; 
  text-align: center;
  margin: 10px; 
  font-size: 30px; 
  font-weight: bold; 
`;

export const SelectFieldAlignMent = styled.View`
  margin: 0 auto;
  width: 70%;
`;

export const IconButton = styled.TouchableOpacity`
  background-color: #003E9B; 
  width: 30px; 
  height: 30px;
  margin-bottom: 7px; 
  border-radius: 3px;
`;

export const AlignCalendarIcon = styled.View`
  height: 100%; 
  justify-content: center;
  align-items: center;
`;

export const AlignSelect = styled.View`
  width: 100%; 
  align-self: flex-start; 
  margin-left: 10px;
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
