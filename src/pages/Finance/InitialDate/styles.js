import styled from "styled-components";

export const DateField = styled.TextInput.attrs({
    placeholderTextColor: '#B2B2B2',
    disabled: true,
})`
    width: 100%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 8px;
    padding-top: 5px;
    color: black;
`;

export const Label = styled.Text`
  color: black;
  margin-left: 3px;
  font-size: 16px;
`;