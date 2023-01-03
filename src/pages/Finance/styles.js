import styled from 'styled-components';
export const MainContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: #D9D9D9;
`;

export const FinanceText = styled.Text`
  color: black; 
  text-align: center;
  margin: 10px; 
  font-size: 30px; 
  font-weight: bold; 
`;

export const AlignImageAndLabel = styled.View`
  width: 90%;
  justify-content: center;
  margin: 0 auto;
`;

export const SelectFieldAlignMent = styled.View`
  margin: 0 auto;
  width: 100%;
`;

export const AlignButton = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003E9B;
  align-items: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  width: 80px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px; 
  font-weight: bold;
  color: white;
`;

export const CancelButtonText = styled(ButtonText)`
  color: black;
`;