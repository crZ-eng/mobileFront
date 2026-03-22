import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import homeScreen from "../screens/homeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TaskScreen from "../screens/TaskScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={homeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="perfil" component={ProfileScreen} />
    <Stack.Screen name="tareas" component={TaskScreen} />
  </Stack.Navigator>
);

export default AppStack;