// PressureChart.js

import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;
export default function PressureChart({ records }) {
  // 1️⃣ On trie les données par date
  const dataPressure = [...records]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((r) => ({
      date: new Date(r.createdAt).toLocaleDateString("fr-FR"),
      systole: parseFloat(r.systole),
      diastole: parseFloat(r.diastole),
      pulse: parseFloat(r.pulse),
      context: r.context || "—",
    }));

  // 2️⃣ Préparation des labels et datasets
  const labels = dataPressure.map((r) => r.date);
  const systoleData = dataPressure.map((r) => r.systole);
  const diastoleData = dataPressure.map((r) => r.diastole);
  const pulseData = dataPressure.map((r) => r.pulse);

  // 3️⃣ Configuration du graphique
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#fff",
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: systoleData,
        color: () => "#ef4444", // rouge
        strokeWidth: 2,
      },
      {
        data: diastoleData,
        color: () => "#3b82f6", // bleu
        strokeWidth: 2,
      },
      {
        data: pulseData,
        color: () => "#22c55e", // vert
        strokeWidth: 2,
      },
    ],
    legend: ["Systole (mmHg)", "Diastole (mmHg)", "Pulse (bpm)"],
  };

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
          Blood Pressure History
        </Text>

        <LineChart
          data={data}
          width={Math.max(screenWidth, labels.length * 60)} // largeur dynamique
          height={260}
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
          }}
          yAxisSuffix=" mmHg"
        />
      </View>
    </ScrollView>
  );
}
