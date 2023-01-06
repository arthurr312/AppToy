import styled from 'styled-components';

export const MainContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: #D9D9D9;
`;

export const Image = styled.Image`
  width: 280px;
  height: 200px;
  align-self: center;
`;

export const FinanceText = styled.Text`
  color: black; 
  text-align: center;
  margin: 10px; 
  font-size: 30px; 
  font-weight: bold; 
`;

export const MainText = styled.Text`
  font-size: 21px;
  color: #192d4b;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
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
  margin-right: 10px;
  padding: 10px;
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

export const OutSideModalBg = styled.View`
  background-color: #000000aa; 
  flex: 1;
  justify-content: center;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 50px;
  padding: 20px;
  min-height: 20%;
  border-radius: 10px;
`;