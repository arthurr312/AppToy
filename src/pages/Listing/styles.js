import styled from 'styled-components';

export const DataContainer = styled.View`
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  width: 90%;
  background-color: white;
  border-radius: 5px;
  elevation: 6;
  gap: 10px;
`;

// export const Title = styled.Text`
//   color: black;
//   font-size: 24px;
//   font-weight: bold;
//   text-align: center;
//   padding: 10px;
// `;

export const NameClient = styled.Text`
  color: black;
  font-size: 18px;
`;

export const TimeValue = styled(NameClient)`
    font-size: 16px;
`;
export const ValueText = styled(NameClient)`
    margin-top: 10px;
`;

export const MainView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DataView = styled.View`
  gap: 20px;
`;

export const ValueView = styled.View``;
