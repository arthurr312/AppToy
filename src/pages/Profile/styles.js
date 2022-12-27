import styled from 'styled-components';

export const MainContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #D9D9D9;
`;

export const Field = styled.TextInput.attrs({
    placeholderTextColor: 'gray',
  })`
    width: 80%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    color: black;
`;

export const Button = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #003E9B;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const ResetPasswordIconContainer = styled.View`
  margin-top: -15px;
`;

export const ErrorMessage = styled.Text`
  margin-left: 8px;
  color: red;
  font-size: 14px;
`;