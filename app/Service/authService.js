
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
// Sauvegarde le token
export async function saveToken(token) {
  if (Platform.OS === 'web') {
    localStorage.setItem('secure_token', token);
   // localStorage.setItem('username', username);
  } else {
    await SecureStore.setItemAsync('secure_token', token);
  }
}

//  Récupère le token
export async function getToken() {
  if (Platform.OS === 'web') {
    return localStorage.getItem('secure_token');
  } else {
    return await SecureStore.getItemAsync('secure_token');
  }
}
// Supprime le token (logout)
export async function removeToken() {
  if (Platform.OS === 'web') {
    localStorage.removeItem('secure_token');
    localStorage.removeItem('username');
  } else {
    await SecureStore.deleteItemAsync('secure_token');
    localStorage.removeItem('username');
  }
}
//  Récupère le token
export async function getUsername() {
  if (Platform.OS === 'web') {
    return localStorage.getItem('username');
  } else {
    return await SecureStore.getItemAsync('username');
  }
}
 //save le username
 export async function saveUsername(username){
  if (Platform.OS === 'web') {
    return localStorage.setItem('username',username);
  } else {
    return await SecureStore.setItemAsync('username',username);
  }
 }