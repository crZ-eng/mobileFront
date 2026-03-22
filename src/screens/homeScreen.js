import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from "../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { logout, userImage } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text style={styles.topText}>INICIO</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.sub}>Bienvenido al panel principal</Text>
      </View>

      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('tareas')}>
          <Text style={styles.cardIcon}>🗂</Text>
          <Text style={styles.cardText}>Mis tareas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('perfil')}>
          
          <Image
            key={userImage}
            source={{ uri: userImage || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />

          <Text style={styles.cardText}>Cambiar Foto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: '#b6bcbe', 
    padding:20
  },

  topBar: {
    backgroundColor: "#38b000",
    padding: 15,
    borderRadius: 5,
    marginTop: 30
  },

  topText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign:"center"
  },

  header: {
    marginTop: 20, 
    marginBottom:30
  },

  welcome: {
    fontSize: 28, 
    fontWeight: 'bold', 
    color: 'rgb(142, 170, 75)'
  },

  sub:{
    fontSize:16, 
    color :'#666'
  },

  menuGrid:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },

  card:{
    backgroundColor:'#fff', 
    width:'48%', 
    padding:20, 
    borderRadius:15,
    elevation:4,
    alignItems: "center"
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  },

  cardIcon: {
    fontSize:40, 
    marginBottom:10
  },

  cardText: {
    fontWeight: 'bold', 
    color: '#333'
  },

  logout: {
    marginTop: 50,
    textAlign: "center",
    color: "red"
  }
});

export default HomeScreen;