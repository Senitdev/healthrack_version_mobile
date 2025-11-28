// src/Service/fetchDataGlucose.js (par exemple)

import { getToken, getUsername } from '../Service/authService';
import { API_BASE_URL } from './apiUrl';
export const fetchDataGlucose = async () => {
  const username =getUsername()
  console.log("glucose",username)
  try {
    // 🔐 Récupération du token
    const token = await getToken();
    if (!token) {
      console.warn('⚠️ Aucun token trouvé — authentification requise.');
      return [];
    }
    // 🌐 Appel API avec le token JWT
    const response = await fetch(`${API_BASE_URL}/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // 🚨 Vérification de la réponse
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur serveur (${response.status}): ${errorText}`);
    }
    // ✅ Conversion JSON et retour
    const data = await response.json();
    console.log('✅ Données glucose reçues:', data);

    return data;
  } catch (error) {
    console.error('❌ Erreur API fetchDataGlucose:', error.message);
    return [];
  }
}