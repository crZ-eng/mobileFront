import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/homeScreen';
import TaskScreen from '../screens/TaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="tareas" component={TaskScreen} />
      <Stack.Screen name="perfil" component={ProfileScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />

    </Stack.Navigator>
  );
};

export default AppStack;