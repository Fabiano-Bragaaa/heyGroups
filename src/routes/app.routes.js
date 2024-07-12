import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from '../screens/SignIn';
import {ChatRoom} from '../screens/ChatRoom';

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
    </Stack.Navigator>
  );
}
