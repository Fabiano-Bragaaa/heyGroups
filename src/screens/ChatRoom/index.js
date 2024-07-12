import {Button, Modal, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  Container,
  SubContainer,
  Title,
  ToggleButton,
  ToglePlus,
  List,
  ContainerPrimary,
  ButtonBack,
  ModalContainer,
  TitleModal,
} from './styles';
import {useState, useEffect} from 'react';
import {Message} from '../Message';
import {ButtonLogin, ButtonTitle, Input} from '../SignIn/sytles';

export function ChatRoom() {
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [groups, setGroups] = useState(['1', '2']);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const [user, setUser] = useState(null);

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate('SignIn');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function modalFunction() {
    if (user) {
      setModalVisible(true);
    } else {
      navigation.navigate('SignIn');
    }
  }

  function handleButtonCreate() {
    if(newGroup.)
  }

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log(hasUser);
    setUser(hasUser);
  }, [isFocus]);

  return (
    <Container>
      <SubContainer>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {user && (
            <TouchableOpacity onPress={handleSignOut} style={{marginRight: 20}}>
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          )}
          <Title>Grupos</Title>
        </View>

        <Icon name="search" size={30} color="#fff" />
      </SubContainer>

      <ToggleButton onPress={modalFunction}>
        <ToglePlus> + </ToglePlus>
      </ToggleButton>

      <List
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => <Message data={item} />}
      />

      <Modal visible={modalVisible} animationType="fade" transparent>
        <ContainerPrimary>
          <ButtonBack onPress={() => setModalVisible(false)}></ButtonBack>

          <ModalContainer>
            <TitleModal>Criar um novo grupo?</TitleModal>
            <Input
              value={newGroup}
              onChangeText={setNewGroup}
              placeholder="Digite o nome do seu grupo"
              placeholderTextColor={'#121212'}
            />
            <ButtonLogin onPress={handleButtonCreate}>
              <ButtonTitle>Criar sala</ButtonTitle>
            </ButtonLogin>
          </ModalContainer>
        </ContainerPrimary>
      </Modal>
    </Container>
  );
}
