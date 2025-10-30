import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import GlucoseChart from "../components/charts/GlucoseChart";
import PressureChart from "../components/charts/PressureChart";
import API_BASE_URL from './Service/apiUrl';
import { getToken, getUsername } from './Service/authService';
export default function History() { 
 const [dataGlucose,setDataGlucose]=useState([]);
 const [dataPressure,setDataPressure]=useState([]);
 const [dataWeight,setDataWeight]=useState([]);
 const[username,setUsername]=useState("");
   useEffect(() => {
  const fetchData = async () => {
    const token = await getToken();
    if (!token) {
      console.warn('⚠️ Aucun token trouvé — authentification requise.');
      return;
    }

    try {
      setUsername(getUsername());
      const response = await fetch(`${API_BASE_URL}/glucose/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setDataGlucose(data);

    } catch (error) {
      console.error('❌ Erreur API fetchDataGlucose:', error.message);
    }
  };
  fetchData();
}, []); // <= le tableau vide garantit que ça s’exécute une seule fois
// Vous pouvez ajouter des useEffect similaires pour la pression et le poids si nécessaire
useEffect(() => {
  const fetchDataPressure = async () => {
    const token = await getToken();
    if (!token) {
      console.warn('⚠️ Aucun token trouvé — authentification requise.');
      return;
    }
 setUsername(getUsername());
    try {
      const response = await fetch(`${API_BASE_URL}/pressure/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const dataPressure = await response.json();
      setDataPressure(dataPressure);
       console.log('Data Pressure:', dataPressure);
    } catch (error) {
      console.error('❌ Erreur API fetchDataPressure:', error.message);
    }
  };
  fetchDataPressure();
}, []); // <= le tableau vide garantit que ça s’exécute une seule fois
return (
  <ScrollView style={{ flex: 1, padding: 10, backgroundColor: '#f5f5f5' }}>
    <GlucoseChart records={dataGlucose} />
    <PressureChart records={dataPressure} />
    {/*<WeightChart records={dataWeight}/>*/}
  </ScrollView>
);

}