import { useState } from "react";
import { CheckBox, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from "./Service/apiUrl";
import { getToken, getUsername } from "./Service/authService";
export default function Pressure(){
const [selected, setSelected] = useState("soir");
const [username,setUsername]=useState("")
 // "Matin" ou "Soir"
const[formData,setFormData]=useState({
    "username":username,
    "systole":"",
    "diastole":"",
    "pulse":"",
    "unite":"mmHg",
    "context":selected,
    "notes":""
})
const HandleCreate= async()=>{
  setUsername(getUsername());
  // Met à jour le username dans formDataco
    setFormData({ ...formData, username: username ,context:selected});
     try {
          const token = await getToken("secure_token");
          if (!token) {
            alert("Authentification requise !");
            return;
          }
          const response = await fetch(`${API_BASE_URL}/pressure`, {
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
    return<View style={styles.wrapper}>
        <Text style={styles.title}>Pression Artérielle</Text>
        <ScrollView style={styles.container}>       
        <TextInput
            style={styles.input}
            value={formData.systole}
            onChangeText={(text) => {
    // Autoriser uniquement chiffres et un seul point décimal
    const numericText = text.replace(/[^0-9.]/g, '');
    // Vérifier qu'il n'y a pas plus d'un point
    if ((numericText.match(/\./g) || []).length > 1) return;
    // Convertir en float seulement si valide
    const numericValue = parseFloat(numericText);
    setFormData({
      ...formData,
      systole: isNaN(numericValue) ? 0 : numericValue,
    });
  }}
            placeholder="Systole"
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            value={formData.diastole}
    onChangeText={(text) => {
    // Autoriser uniquement chiffres et un seul point décimal
    const numericText = text.replace(/[^0-9.]/g, '');
    // Vérifier qu'il n'y a pas plus d'un point
    if ((numericText.match(/\./g) || []).length > 1) return;
    // Convertir en float seulement si valide
    const numericValue = parseFloat(numericText);
    setFormData({
      ...formData,
      diastole: isNaN(numericValue) ? 0 : numericValue,
    });
       }}
            placeholder="Diastole"
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            value={formData.pulse}
             onChangeText={(text) => {
    // Autoriser uniquement chiffres et un seul point décimal
    const numericText = text.replace(/[^0-9.]/g, '');
    // Vérifier qu'il n'y a pas plus d'un point
    if ((numericText.match(/\./g) || []).length > 1) return;
    // Convertir en float seulement si valide
    const numericValue = parseFloat(numericText);
    setFormData({
      ...formData,
      pulse: isNaN(numericValue) ? 0 : numericValue,
    });
   }}
            placeholder="Pulse"
            keyboardType="numeric"
        />
        <TextInput
            style={styles.input}
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            placeholder="Notes"
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

        <TouchableOpacity style={styles.button} onPress={HandleCreate}><Text style={styles.buttonText}>Save</Text></TouchableOpacity>
      </ScrollView>
    </View>
}
const styles=({
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
   wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    Padding: 15,
  },
  container: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }
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
   title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
})