import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
  TextInput
} from "react-native";

import { AuthContext } from "../context/AuthContext";
import { getTasks, taskService } from "../api/apiService";
// btncerrar sesion

import { TouchableOpacity } from "react-native";

// Firebase logout
import { signOut } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

const TaskScreen = () => {
  const { userToken, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // estados para crear / editar
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // cargar tareas
  const loadTasks = async () => {
    try {
      const data = await getTasks(userToken);
      setTasks(data.datos || []);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  //eliminar 
  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar tarea",
      "¿Seguro que quieres eliminar esta tarea?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await taskService.delete(userToken, id);
              loadTasks();
            } catch (error) {
              console.log("ERROR DELETE:", error);
            }
          },
        },
      ]
    );
  };
  // editar
  const handleEdit = (task) => {
    setTitulo(task.titulo);
    setDescripcion(task.descripcion);
    setEditandoId(task.id);
  };

  // editar y crear 
  const handleCreate = async () => {
    if (!titulo || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    } // esto para que al crear los campos no esten vacios 

    try {
      if (editandoId) {
        //editar
        await taskService.update(userToken, editandoId, {
          titulo,
          descripcion,
        });
      } else {
        // creas
        await taskService.create(userToken, {
          titulo,
          descripcion,
        });
      }

      // limpiar
      setTitulo("");
      setDescripcion("");
      setEditandoId(null);

      loadTasks();
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
    } catch (error) {
      console.log("ERROR LOGOUT:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      loadTasks();
    }
  }, [userToken]);


  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  //ui


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Evidencias SENA</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>


      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.input}
      />

      <Button
        title={editandoId ? "Actualizar mi tarea" : "Crear tarea"}
        onPress={handleCreate}
      />


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

            <Button
              title="Editar"
              onPress={() => handleEdit(item)}
            />

            <Button
              title="Eliminar"
              color="red"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

// estilos


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
    marginBottom: 10,
    marginTop: 30,
    textAlign: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f1eaea",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#666",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  // stylo de btn cerrar sesion

  logoutBtn: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    
    marginBottom: 10,
    alignItems: "center",
    
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  }
});

export default TaskScreen;