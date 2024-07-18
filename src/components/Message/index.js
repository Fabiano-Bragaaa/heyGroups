import {Text, View} from 'react-native';
import {Container, SubTitle, Title} from './styles';

import {useNavigation} from '@react-navigation/native';

export function Message({data, deleteRoom, userStatus}) {
  const navigation = useNavigation();

  function openChat() {
    if (userStatus) {
      navigation.navigate('GroupChat', {thred: data});
    } else {
      navigation.navigate('SignIn');
    }
  }

  return (
    <Container
      onPress={openChat}
      onLongPress={() => deleteRoom && deleteRoom()}>
      <Title numberOfLines={1}>{data.name}</Title>
      <SubTitle>{data.lastMessage.text}</SubTitle>
    </Container>
  );
}
