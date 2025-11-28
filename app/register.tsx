import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { API_BASE_URL } from "./Service/apiUrl";
export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      Alert.alert("Compte créé avec succès ✅");
      router.push("/connexion"); // retour vers login après inscription
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur lors de l'inscription");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerLeft: () => null }} />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>Inscription</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              value={username}
              autoCapitalize="none"
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push("/connexion")}>
            <Text style={styles.registerText}>
              Déjà un compte ? <Text style={styles.registerLink}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
