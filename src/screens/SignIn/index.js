import {useState} from 'react';
import {
  Container,
  ContainerTitle,
  Title,
  SubTitle,
  ContainerInput,
  Input,
  Button,
  ButtonTitle,
  ButtonLogin,
} from './sytles';
import {TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setEmail('');
    setNome('');
    setPassword('');
  }

  function handleSignUp() {
    if (nome === '' || email === '' || password === '') {
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user
          .updateProfile({
            displayName: nome,
          })
          .then(() => {
            navigation.goBack();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSignIn() {
    if (email === '' || password === '') {
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  }

  if (login) {
    return (
      <Container>
        <ContainerTitle>
          <Title>HeyGroups</Title>
          <SubTitle>Ajude, colabore, faça networking!</SubTitle>
        </ContainerTitle>

        <ContainerInput>
          <Input
            placeholder="Seu nome"
            value={nome}
            onChangeText={setNome}
            placeholderTextColor={'#121212'}
          />
          <Input
            placeholder="Seu email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={'#121212'}
          />
          <Input
            placeholder="Sua Senha"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={'#121212'}
            secureTextEntry
          />

          <ButtonLogin onPress={handleSignUp}>
            <ButtonTitle>Cadastrar</ButtonTitle>
          </ButtonLogin>
          <TouchableOpacity onPress={toggleLogin}>
            <SubTitle>Já possuo uma conta</SubTitle>
          </TouchableOpacity>
        </ContainerInput>
      </Container>
    );
  }

  return (
    <Container>
      <ContainerTitle>
        <Title>HeyGroups</Title>
        <SubTitle>Ajude, colabore, faça networking!</SubTitle>
      </ContainerTitle>

      <ContainerInput>
        <Input
          placeholder="Seu email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={'#121212'}
        />
        <Input
          placeholder="Sua Senha"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'#121212'}
          secureTextEntry
        />

        <ButtonLogin onPress={handleSignIn}>
          <ButtonTitle>Acessar</ButtonTitle>
        </ButtonLogin>
        <TouchableOpacity onPress={toggleLogin}>
          <SubTitle>Criar uma nova conta</SubTitle>
        </TouchableOpacity>
      </ContainerInput>
    </Container>
  );
}
