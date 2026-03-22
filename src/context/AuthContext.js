import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
  };

  const logout = async () => {
    setUserToken(null);
    setUserImage(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userImage');
  };

  const saveImage = async (uri) => {
    setUserImage(uri);
    await AsyncStorage.setItem("userImage", uri);
  };

  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const image = await AsyncStorage.getItem('userImage');

      if (token && token !== "null" && token !== "undefined") {
        setUserToken(token);
      } else {
        setUserToken(null);
      }

      if (image) {
        setUserImage(image);
      }

    } catch (e) {
      console.log('error en persistencia:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await isLoggedIn();
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout, 
      userToken, 
      isLoading,
      userImage,
      saveImage
    }}>
      {children}
    </AuthContext.Provider>
  );
};