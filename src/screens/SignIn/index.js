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
import {ActivityIndicator, Alert, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();

  const [loadingAuth, setLoadingAuth] = useState(false);
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

    setLoadingAuth(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user.user
          .updateProfile({
            displayName: nome,
          })
          .then(() => {
            setLoadingAuth(false);

            navigation.goBack();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        setLoadingAuth(false);

        console.log(err);
      });
  }

  function handleSignIn() {
    if (email === '' || password === '') {
      return;
    }
    setLoadingAuth(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoadingAuth(false);
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert(
          'Email e/ou senha incorretas.',
          'Verifique os dados e tente novamente!',
        );
        setLoadingAuth(false);
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
            {loadingAuth ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
              <ButtonTitle>Cadastrar</ButtonTitle>
            )}
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
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <ButtonTitle>Acessar</ButtonTitle>
          )}
        </ButtonLogin>
        <TouchableOpacity onPress={toggleLogin}>
          <SubTitle>Criar uma nova conta</SubTitle>
        </TouchableOpacity>
      </ContainerInput>
    </Container>
  );
}
