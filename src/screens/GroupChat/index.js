import {useState, useEffect} from 'react';
import {FlatList, Platform} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ChatMessage} from '../../components/ChatMessage';
import {
  Container,
  SafeViewChat,
  ViewInput,
  SubViewInput,
  Input,
  IconButton,
} from './styles';

import Icon from 'react-native-vector-icons/Feather';

export function GroupChat({route}) {
  const {thred} = route.params;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const user = auth().currentUser.toJSON();

  async function handleSend() {
    if (input.trim() === '') return;

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thred._id)
      .collection('MESSAGES')
      .add({
        text: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      });

    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thred._id)
      .update({
        lastMessage: {
          text: input,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      });

    setInput('');
  }

  useEffect(() => {
    const unsubscribelistenner = firestore()
      .collection('MESSAGE_THREADS')
      .doc(thred._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(response => {
        const messages = response.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }
          return data;
        });

        setMessages(messages);
      });

    return () => {
      unsubscribelistenner();
    };
  }, []);
  return (
    <Container>
      <FlatList
        style={{width: '100%'}}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatMessage data={item} />}
        inverted
      />
      <SafeViewChat
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ViewInput>
          <SubViewInput>
            <Input
              placeholder="Sua mensagem ..."
              value={input}
              onChangeText={setInput}
              multiline
              autoCorrect={false}
            />
          </SubViewInput>
          <IconButton onPress={handleSend}>
            <Icon name="send" size={22} color={'#fff'} />
          </IconButton>
        </ViewInput>
      </SafeViewChat>
    </Container>
  );
}
