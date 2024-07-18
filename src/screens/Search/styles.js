import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const ViewInput = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 14px 0;
`;

export const Input = styled.TextInput`
  background-color: #ebebeb;
  margin-left: 10px;
  height: 50px;
  width: 80%;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
`;

export const ButtonIcon = styled.TouchableOpacity`
  background-color: #2e54d4;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  width: 15%;
  margin-left: 5px;
  margin-right: 10px;
`;
