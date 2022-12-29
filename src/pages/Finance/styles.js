import styled from 'styled-components';

export const Field = styled.TextInput.attrs({
  placeholderTextColor: '#B2B2B2',
})`
  width: 100%;
  border: 1px solid gray;
  background: white;
  border-radius: 5px;
  padding: 10px;
  margin: 0 auto;
  color: black;
`;

export const FieldAlignment = styled.View`
  margin: 0 auto;
  flex-direction: row; 
  width: 70%; 
  justify-content: space-evenly; 
`;