import {Container, Input, ViewInput, ButtonIcon} from './styles';
import {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {useIsFocused} from '@react-navigation/native';
import {FlatList, Keyboard} from 'react-native';
import {Message} from '../../components/Message';

export function Search() {
  const isFocus = useIsFocused();
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

  async function handleSerch() {
    if (input.trim() === '') return;

    const responseSearch = await firestore()
      .collection('MESSAGE_THREADS')
      .where('name', '>=', input)
      .where('name', '<=', input + '\uf8ff')
      .get()
      .then(r => {
        const threads = r.docs.map(mapResponse => {
          return {
            _id: mapResponse.id,
            name: '',
            lastMessage: {
              text: '',
            },
            ...mapResponse.data(),
          };
        });
        setChats(threads);
        setInput('');
        Keyboard.dismiss();
      });
  }

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    setUser(hasUser);
  }, [isFocus]);

  return (
    <Container>
      <ViewInput>
        <Input
          value={input}
          onChangeText={setInput}
          placeholder="Digite o nome da sala"
          autoCapitalize="none"
        />
        <ButtonIcon onPress={handleSerch}>
          <Icon name="search" color={'#fff'} size={30} />
        </ButtonIcon>
      </ViewInput>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({item}) => <Message data={item} userStatus={user} />}
      />
    </Container>
  );
}
