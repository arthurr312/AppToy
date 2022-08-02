import styled from "styled-components";

export const Container = styled.View`
    flex: 1; 
    justify-content: center; 
    align-items: center; 
    background-color: white;
`;

export const Field = styled.TextInput.attrs({
    placeholderTextColor:'#B2B2B2'
})`
width: 60%; height: 5%; border-width: 1px; border-radius: 5px; padding: 10px; margin: 10px; color: black;
`;