import styled from "styled-components";

export const DateField = styled.TextInput.attrs({
  editable: false, 
  selectTextOnFocus: false,
})`
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    color: black;
`;

export const Label = styled.Text`
  color: black;
  margin-left: 3px;
  font-size: 16px;
  padding-bottom: 5px;
`;
