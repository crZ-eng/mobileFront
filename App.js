import React, { useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import AppStack from "./src/navigation/AppStack";
import LoginScreen from "./src/screens/LoginScreen";

const AppContent = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return userToken ? <AppStack /> : <LoginScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
}