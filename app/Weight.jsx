import { useState } from "react";
import { CheckBox, Text, TextInput, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from "./Service/apiUrl";
import { getToken, getUsername } from "./Service/authService";
export default function Weight(){
const[selected, setSelected] = useState("soir"); // "Matin" ou "Soir"
const[username,setUsername]=useState("");
const [formData,setformData]=useState({
    "username":username,
    "weight":"",
    "height":"",
    "unite":"kg",
    "context":selected,
    "notes":""
})
const HandleSubmit=async()=>{
     try {
       const token = await getToken("secure_token");
       if (!token) {
         alert("Authentification requise !");
         return;
       }
       setUsername(getUsername())
        setformData({ ...formData, username: username ,context:selected});
       const response = await fetch(`${API_BASE_URL}/weight`, {
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
      <View style={styles.wrapper}>
        <Text style={styles.title}>Poids</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={formData.weight}
             onChangeText={(text) => {
                // Autoriser uniquement chiffres et un seul point décimal
                const numericText = text.replace(/[^0-9.]/g, '');
                // Vérifier qu'il n'y a pas plus d'un point
                if ((numericText.match(/\./g) || []).length > 1) return;
                // Convertir en float seulement si valide
                const numericValue = parseFloat(numericText);
                setformData({ ...formData, weight: isNaN(numericValue) ? 0 : numericValue });
               }}
             placeholder="Weight"
         keyboardType="numeric"
        />
         <TextInput
            style={styles.input}
            value={formData.height}
             onChangeText={(text) => {
                // Autoriser uniquement chiffres et un seul point décimal
                const numericText = text.replace(/[^0-9.]/g, '');
                // Vérifier qu'il n'y a pas plus d'un point
                if ((numericText.match(/\./g) || []).length > 1) return;
                // Convertir en float seulement si valide
                const numericValue = parseFloat(numericText);
                setformData({ ...formData, height: isNaN(numericValue) ? 0 : numericValue });
               }}
             placeholder="Height"
         keyboardType="numeric"
        />
         {/* Notes */}
            <TextInput
              style={[styles.input, { height: 50 }]}
              value={formData.notes}
              onChangeText={(text) => setformData({ ...formData, notes: text })}
                 placeholder="Notes"
                multiline
                />
        <Text>Choisir Contexte :</Text>
        <View style={styles.option}>
         <CheckBox
           value={selected === "matin"}
            onValueChange={() => {
            setSelected("matin");
            setformData({ ...formData, context: "matin" });
             }}
            />
            <Text style={styles.checkboxLabel}>Matin</Text>
            </View>
               
            <View style={styles.option}>
              <CheckBox
                value={selected === "soir"}
                onValueChange={() => {
                  setSelected("soir");
                  setformData({ ...formData, context: "soir" });
                }}
              />
            <Text style={styles.checkboxLabel}>Soir</Text>
            </View>
       
               <TouchableOpacity style={styles.button} onPress={HandleSubmit}><Text style={styles.buttonText}>Save</Text></TouchableOpacity>
        </View>
         </View>
         );
}
const styles=({
    input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
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