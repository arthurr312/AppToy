import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #D9D9D9;
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

export const Text = styled.Text`
  color: white;
  font-size: 16px;
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
