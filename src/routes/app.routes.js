import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from '../screens/SignIn';
import {ChatRoom} from '../screens/ChatRoom';
import {GroupChat} from '../screens/GroupChat';
import {Search} from '../screens/Search';

export function AppRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{title: 'faça login'}}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={({route}) => ({
          title: route.params.thred.name,
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{title: 'Procurando algum grupo?'}}
      />
    </Stack.Navigator>
  );
}
