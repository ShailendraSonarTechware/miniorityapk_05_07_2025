import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";  // Correct import for expo-router

export default function OrderSuccess() {
  // Using useLocalSearchParams to access dynamic route parameters for nested routes
  const { orderId, groupOrderId } = useLocalSearchParams();  // Access dynamic parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Order Placed Successfully!</Text>
      <Text style={styles.text}>Order ID: {orderId}</Text>
      <Text style={styles.text}>Group Order ID: {groupOrderId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 6 },
});
