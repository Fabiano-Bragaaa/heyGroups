import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 10px;
`;

export const MessageBoxView = styled.View`
  border-radius: 5px;
  padding: 10px;
  background-color: ${props => (props.message ? '#dcf8c5' : '#fff')};
  margin-left: ${props => (props.message ? '50px' : 0)};
  margin-right: ${props => (props.message ? 0 : '50px')};
`;

export const Name = styled.Text`
  color: #f53745;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const MessageBox = styled.Text`
  color: #000;
`;
