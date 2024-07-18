import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import firestore, {doc} from '@react-native-firebase/firestore';

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
import {Message} from '../../components/Message';
import {ButtonLogin, ButtonTitle, Input} from '../SignIn/sytles';

export function ChatRoom() {
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  const [groups, setGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroup, setNewGroup] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

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
    if (newGroup.trim() === '') {
      Alert.alert('Campo vazio', 'Digite algo!');
      return;
    } else {
      firestore()
        .collection('MESSAGE_THREADS')
        .get()
        .then(r => {
          let myThreads = 0;

          r.docs.map(item => {
            if (item.data().owner === user.uid) {
              myThreads += 1;
            }
          });
          if (myThreads >= 4) {
            alert('Você já atingiu o limite de grupos por usuario.');
            setModalVisible(false);
          } else {
            createRoom();
          }
        });
    }
  }

  //criar nova sala no firestore

  function createRoom() {
    firestore()
      .collection('MESSAGE_THREADS')
      .add({
        name: newGroup,
        owner: user.uid,
        lastMessage: {
          text: `grupo ${newGroup} criado. Seja bem-vindo(a)!`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(r => {
        r.collection('MESSAGES')
          .add({
            text: `grupo ${newGroup} criado. Seja bem-vindo(a)!`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setModalVisible(false);
            setNewGroup('');
            setUpdateScreen(!updateScreen);
          });
      })
      .catch(err => {
        console.log('erro ao cadastrar', err);
      });
  }

  function deleteRoom(ownerId, idRoom) {
    //se o cara tentar deletar um grupo q n é dele
    if (ownerId !== user?.uid) return;

    Alert.alert('Atenção!', 'Você tem certeza que deseja deletar essa sala?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => handleDeleteRoom(idRoom),
      },
    ]);
  }

  async function handleDeleteRoom(idRoom) {
    await firestore().collection('MESSAGE_THREADS').doc(idRoom).delete();

    setUpdateScreen(!updateScreen);
  }

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocus]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then(r => {
          const threads = r.docs.map(documentsRecive => {
            return {
              _id: documentsRecive.id,
              name: '',
              lastMessage: {text: ''},
              ...documentsRecive.data(),
            };
          });

          if (isActive) {
            setGroups(threads);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('erro ao receber os grupos ', err);
        });
    }

    getChats();

    //aq so vai ser chamada quando o componente for desmontado

    return () => {
      isActive = false;
    };
  }, [isFocus, updateScreen]);

  if (loading) {
    return <ActivityIndicator size="large" color="#555" />;
  }

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
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </SubContainer>

      <ToggleButton onPress={modalFunction}>
        <ToglePlus> + </ToglePlus>
      </ToggleButton>

      <List
        data={groups}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Message
            userStatus={user}
            data={item}
            deleteRoom={() => deleteRoom(item.owner, item._id)}
          />
        )}
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
