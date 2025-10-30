

// WeightChart.js
import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function WeightChart({ records }) {
  // 1️⃣ Préparation des données (comme sur ton composant web)
  const dataWeight = [...records]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((r) => ({
      date: new Date(r.created_at).toLocaleDateString("fr-FR"),
      value: parseFloat(r.weight),
      context: r.context || "—",
      notes: r.notes || "",
    }));

  // 2️⃣ Extraction des labels et valeurs
  const labels = dataWeight.map((r) => r.date);
  const values = dataWeight.map((r) => r.value);

  // 3️⃣ Configuration du graphique
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 1, // pour afficher les décimales
    color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`, // vert
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#fff",
    },
  };

  // 4️⃣ Données pour le graphique
  const data = {
    labels,
    datasets: [
      {
        data: values,
        color: () => "#16a34a",
        strokeWidth: 2,
      },
    ],
    legend: ["Poids (kg)"],
  };

  // 5️⃣ Rendu
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          margin: 8,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
          Weight History
        </Text>

        <LineChart
          data={data}
          width={Math.max(screenWidth, labels.length * 60)}
          height={260}
          yAxisSuffix=" kg"
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
}
