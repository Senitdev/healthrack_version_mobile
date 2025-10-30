
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { saveToken, saveUsername } from './Service/authService';
export default function HomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password,setPassword]=useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        alert("Identifiants invalides")
        throw new Error('Identifiants invalides');
        
      }
      const data = await response.json();
      const token = data.token; // selon ton backend, peut-être data.accessToken ou autre
      // Sauvegarde du token
      await saveToken(token);
      //save du username
      await saveUsername(username);
     if (token !== "") {
     // router.push("/Dashboard")
      router.push('/Dashboard');
     }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur');
    }
  };

  const handleGoogleLogin = () => {
    console.log("Connexion via Google");
  };

  const handleGithubLogin = () => {
    console.log("Connexion via GitHub");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>HealthTrack</Text>

        {/* Formulaire */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Identifiant / Email"
            value={username}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        {/* Inscription */}
        <Text style={styles.registerText}>
          Pas encore de compte ?{" "}
          <Text style={styles.registerLink}>Créer un compte</Text>
        </Text>

        {/* Connexion sociale */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <AntDesign name="google" size={24} color="black" />
            <Text style={styles.socialLabel}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleGithubLogin}>
            <FontAwesome name="github" size={24} color="black" />
            <Text style={styles.socialLabel}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6", // fond clair de l'écran
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5, // ombre Android
    shadowColor: "#000", // ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1E40AF",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 10,
  },
  registerLink: {
    color: "#1E40AF",
    fontWeight: "bold",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  socialLabel: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});
