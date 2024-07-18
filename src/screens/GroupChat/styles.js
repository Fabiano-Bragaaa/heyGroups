import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SafeViewChat = styled.KeyboardAvoidingView`
  width: 100%;
`;

export const ViewInput = styled.View`
  flex-direction: row;
  margin: 10px;
  align-items: flex-end;
`;

export const SubViewInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  flex: 1;
  border-radius: 25px;
  margin-right: 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  margin: 0 10px;
  max-height: 130px;
  min-height: 48px;
`;

export const IconButton = styled.TouchableOpacity`
  background-color: #51c880;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
`;
