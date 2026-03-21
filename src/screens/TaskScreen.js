import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import { getTasks } from "../api/apiService";

// 🔐 Firebase logout
import { signOut } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

const TaskScreen = () => {
  const { userToken, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Cargar tareas
  const loadTasks = async () => {
    try {
      console.log("TOKEN:", userToken);

      const data = await getTasks(userToken);

      console.log("RESPUESTA API:", data);

      setTasks(data.datos || []);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase
      logout(); // Contexto
    } catch (error) {
      console.log("ERROR LOGOUT:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      loadTasks();
    }
  }, [userToken]);

  // ⏳ Loading
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 📱 UI
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Evidencias SENA</Text>

      
      <Button title="Cerrar sesión" onPress={handleLogout} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay tareas</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.titulo}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c4b7b7",
    padding: 15,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    color:"#0a0808",
    marginTop:30,
    textAlign: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#f1eaea",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#666",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default TaskScreen;