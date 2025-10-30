import { useState } from "react";
import { CheckBox, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from './Service/apiUrl';
import { getToken, getUsername } from "./Service/authService";
export default function GlucoseScreen() {
  const [selected, setSelected] = useState("soir"); // "Matin" ou "Soir"
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    username: username,
    value: 0,
    context: selected,
    unite: "ML/gl",
    notes: "",
  });

  const HandleCreate = async () => {
    setUsername(getUsername());
    // Met à jour le username dans formData
    setFormData({ ...formData, username: username ,context:selected});
    try {
      const token = await getToken("secure_token");
      if (!token) {
        alert("Authentification requise !");
        return;
      }
      const response = await fetch(`${API_BASE_URL}/glucose`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        alert("Ajouté avec succès !");
        console.log("Réponse serveur :", data);
      } else {
        console.error("Erreur du serveur :", response.status, data);
        alert(`Erreur serveur (${response.status})`);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre :", error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <ScrollView>
    <View style={styles.wrapper}>
      <Text style={styles.title}>Glucose</Text>

      <View style={styles.container}>
        <View style={styles.form}>
          {/* Champ valeur numérique */}
        <TextInput
  style={styles.input}
  value={String(formData.value)}
  onChangeText={(text) => {
    // Autoriser uniquement chiffres et un seul point décimal
    const numericText = text.replace(/[^0-9.]/g, '');
    // Vérifier qu'il n'y a pas plus d'un point
    if ((numericText.match(/\./g) || []).length > 1) return;
    // Convertir en float seulement si valide
    const numericValue = parseFloat(numericText);
    setFormData({
      ...formData,
      value: isNaN(numericValue) ? 0 : numericValue,
    });
  }}
  placeholder="Glucose (mg/dL)"
  keyboardType="decimal-pad" // ✅ permet d'entrer des nombres avec des décimales
/>

          {/* Notes */}
          <TextInput
            style={[styles.input, { height: 50 }]}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Notes"
            multiline
          />

          {/* Sélection du contexte */}
          <View style={styles.checkBoxContainer}>
            <Text>Choisir Contexte :</Text>

            <View style={styles.option}>
              <CheckBox
                value={selected === "matin"}
                onValueChange={() => {
                  setSelected("matin");
                  setFormData({ ...formData, context: "matin" });
                }}
              />
              <Text style={styles.checkboxLabel}>Matin</Text>
            </View>

            <View style={styles.option}>
              <CheckBox
                value={selected === "soir"}
                onValueChange={() => {
                  setSelected("soir");
                  setFormData({ ...formData, context: "soir" });
                }}
              />
              <Text style={styles.checkboxLabel}>Soir</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={HandleCreate}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: "#71c559",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkBoxContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
});
