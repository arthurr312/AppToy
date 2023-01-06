import styled from "styled-components";

export const ImageContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`;

export const Image = styled.Image`
    width: 250px;
    height: 120px;
`;

export const MainText = styled.Text`
    font-size: 22px; 
    font-weight: 400px; 
    text-align: center; 
    color: black; 
    background-color: transparent;
`;

export const SecondaryText = styled.Text`
    color: gray;
    font-size: 16px;
    text-align: center;
`;

export const AlignButtons = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-top: 10px;
`;

export const Button = styled.TouchableOpacity`
  min-width: 80px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
  background-color: #003E9B;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px; 
  font-weight: bold;
  color: white;
`;