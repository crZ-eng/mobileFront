# 1. Clonar el repositorio
git clone https://github.com/crZ-eng/mobileFront.git
cd mobileFront

# 2. Instalar dependencias de Node
npm install

# 3. Instalar React Navigation y el stack navigator
npm install @react-navigation/native @react-navigation/native-stack

# 4. Instalar las dependencias nativas requeridas por React Navigation (Expo compatible)
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

# 5. Instalar Expo Image Picker
npx expo install expo-image-picker

# 6. Limpiar caché de Metro y arrancar el proyecto
npx expo start -c