import {useMemo} from 'react';

import auth from '@react-native-firebase/auth';
import {Container, MessageBoxView, Name, MessageBox} from './styles';

export function ChatMessage({data}) {
  const user = auth().currentUser.toJSON();

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);

  return (
    <Container>
      <MessageBoxView message={isMyMessage}>
        {!isMyMessage && <Name>{data?.user?.displayName}</Name>}
        <MessageBox>{data.text}</MessageBox>
      </MessageBoxView>
    </Container>
  );
}
