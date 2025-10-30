export default function loginService(username, password) {
const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:9090/api/v2/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Identifiants invalides');
      }

      const data = await response.json();
      const token = data.token; // selon ton backend, peut-être data.accessToken ou autre

      // Sauvegarde du token
      await AsyncStorage.setItem('token', token);

      Alert.alert('Connexion réussie ✅', `Token: ${token}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', error.message);
    }
  };
}