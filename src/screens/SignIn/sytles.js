import {useState} from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ContainerTitle = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 30px;

  margin-top: 50px;
`;

export const SubTitle = styled.Text`
  color: #121212;
`;

export const ContainerInput = styled.View`
  margin-top: 20px;

  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 50px;

  background-color: #ebebeb;

  padding: 10px;

  border-radius: 8px;

  color: #121212;

  margin-bottom: 15px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  width: 90%;
  height: 50px;

  justify-content: center;
  align-items: center;

  background-color: #2e54d4;

  border-radius: 8px;

  margin-bottom: 10px;
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-size: 20px;

  font-weight: bold;
`;
