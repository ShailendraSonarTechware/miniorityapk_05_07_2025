import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";

export default function QRScreen() {
  // Access the query parameters (url and amount)
  const { url, amount } = useLocalSearchParams<{ url: string; amount?: string }>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Scan to Pay</Text>
        <Text style={styles.subtitle}>{amount ? `Amount: ₹${amount}` : "Amount not available"}</Text>
        <View style={styles.qrWrap}>
          {/* Only render QRCode if the URL is present */}
          {url ? <QRCode value={url} size={260} /> : <Text>No payment link.</Text>}
        </View>
        <Text style={styles.hint}>
          Use your phone’s camera or UPI app to open the link and complete payment.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, alignItems: "center", gap: 16 },
  title: { fontSize: 22, fontWeight: "700" },
  subtitle: { fontSize: 16, color: "#6b7280" },
  qrWrap: { marginTop: 12, padding: 16, borderRadius: 12, backgroundColor: "#f9fafb" },
  hint: { marginTop: 10, color: "#6b7280", textAlign: "center" },
});
