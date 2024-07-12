import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const SubContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  height: 10%;

  background-color: #2e54d4;

  padding: 20px;

  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;

  margin-bottom: 15px;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #fff;

  font-weight: bold;
`;

export const ToggleButton = styled.TouchableOpacity`
  position: absolute;

  z-index: 99;

  height: 60px;
  width: 60px;

  border-radius: 30px;

  background: #2e54d4;

  justify-content: center;
  align-items: center;

  bottom: 5%;
  right: 5%;
`;

export const ToglePlus = styled.Text`
  color: #fff;

  font-size: 25px;

  font-weight: bold;
`;

export const List = styled.FlatList`
  flex: 1;
  background-color: #fff;
`;

export const ContainerPrimary = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ButtonBack = styled.TouchableOpacity`
  height: 100%;

  background-color: rgba(34, 34, 34, 0.4);
`;

export const ModalContainer = styled.View`
  width: 100%;
  height: 40%;
  flex: 1;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  align-items: center;

  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const TitleModal = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
