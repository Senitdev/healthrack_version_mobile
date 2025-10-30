import { Platform } from "react-native";
export async function saveToken(token) {
  if (Platform.OS === 'web') {
    localStorage.setItem('secure_token', token);
  } else {
    await SecureStore.setItemAsync('secure_token', token);
  }
}