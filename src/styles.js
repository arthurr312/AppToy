import styled from "styled-components";

export const Container = styled.View`
    flex: 1; 
    justify-content: center; 
    align-items: center; 
    background-color: white;
`;

export const Button = styled.TouchableOpacity`
width: 100px;
height: 42px;
margin-top: 5px;
border-radius: 5px;
background-color: #0A0092;
align-items: center;
justify-content: center;
`;

export const Field = styled.TextInput.attrs({
    placeholderTextColor:'#B2B2B2'
})`
width: 60%; height: 5%; border-width: 1px; border-radius: 5px; padding: 10px; margin: 10px; color: black;
`;