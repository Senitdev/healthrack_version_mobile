import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
export default function GlucoseChart({ records = [] }) {
  // Formateur de date sans heure
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  // Préparation des données
  const dataGlucose = Array.isArray(records)
    ? records
        .filter(r => r && r.createdAt && r.value != null)
        .map(r => ({
          name: formatDate(r.createdAt),
          value: Number(r.value),
        }))
    : [];

  // Extraction des labels et valeurs
  const labels = dataGlucose.map((d, i) => (i % 2 === 0 ? d.name : "")); // un label sur 2 pour lisibilité
  const values = dataGlucose.map((d) => d.value);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Historique de glycémie</Text>
      <ScrollView horizontal>
        <LineChart
          data={{
            labels,
            datasets: [{ data: values }],
          }}
          width={Dimensions.get("window").width * 1.5}
          height={220}
          yAxisSuffix=" mg/dL"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#f0fdf4",
            backgroundGradientTo: "#dcfce7",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#16a34a",
            },
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    margin: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});
