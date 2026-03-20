import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput
} from "react-native";

import { AuthContext } from "../context/AuthContext";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../api/firebaseConfig";

const auth = getAuth(app);

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Por favor ingrese email y contraseña");
    }

    setLoading(true);

    try {
      //  Login con Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  Obtener token REAL de Firebase
      const token = await userCredential.user.getIdToken();

      console.log("TOKEN FIREBASE:", token);

      //  Guardar token en tu contexto
      login(token);

    } catch (error) {
      Alert.alert("Error de login", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ADSO gestor de tareas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333"
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#564e4e",
    marginBottom: 20,
    padding: 10
  }
});

export default LoginScreen;