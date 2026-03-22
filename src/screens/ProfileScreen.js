import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { userImage, saveImage } = useContext(AuthContext);
  const [localImage, setLocalImage] = useState(userImage || null);

  // Mantener la imagen actualizada
  useEffect(() => {
    setLocalImage(userImage);
  }, [userImage]);

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;

      console.log("IMAGEN SELECCIONADA:", uri);

      // Actualiza localmente y en contexto
      setLocalImage(uri);
      await saveImage(uri);

      // Botón volver automático o manual
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Home"); // reemplaza "Home" por tu pantalla principal real
      }
    } else {
      Alert.alert("Error", "No se encontró imagen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      <Image
        key={localImage} // fuerza actualización cuando cambia
        source={{ uri: localImage || "https://via.placeholder.com/150" }}
        style={styles.image}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Cambiar foto de perfil" onPress={pickImage} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
});