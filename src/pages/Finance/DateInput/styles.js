import styled from "styled-components";

export const DateField = styled.TextInput.attrs({
  editable: false, 
  selectTextOnFocus: false,
})`
    width: 100%;
    border: 2px solid gray;
    border-radius: 5px;
    padding: 15px;
    color: black;
`;

export const Label = styled.Text`
  color: black;
  margin-left: 3px;
  font-size: 16px;
  padding-bottom: 5px;
`;
