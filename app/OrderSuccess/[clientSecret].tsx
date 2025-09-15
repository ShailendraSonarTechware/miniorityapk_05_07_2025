import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OrderSuccess() {
  const { clientSecret } = useLocalSearchParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log("Client Secret from URL:", clientSecret);


  useEffect(() => {
    if (clientSecret) {
      // Ensure clientSecret is a string
      const secret = Array.isArray(clientSecret) ? clientSecret[0] : clientSecret;
      fetchOrderDetails(secret);
    }
  }, [clientSecret]);

const fetchOrderDetails = async (clientSecret: string) => {
  try {
    const paymentIntentId = clientSecret.split('_secret_')[0];
    const token = await AsyncStorage.getItem('authToken');

    const res = await fetch(`https://api.mosaicbizhub.com/api/orders/retrieve-intent/${paymentIntentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log("Order data:", data);

    if (data.success && data.orders?.length > 0) {
      setOrder({
        paymentIntent: data.paymentIntent,
        ...data.orders[0]  // spread the first order in the orders array
      });
    } else {
      setOrder(null);
    }
  } catch (err) {
    console.error("Error fetching order:", err);
    setOrder(null);
  } finally {
    setLoading(false);
  }
};




  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Failed to load order details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎉 Order Placed Successfully!</Text>

      <Text style={styles.text}>Client Secret: {Array.isArray(clientSecret) ? clientSecret[0] : clientSecret}</Text>
      <Text style={styles.text}>Payment Intent: {order.paymentIntentId || "-"}</Text>
      <Text style={styles.text}>Status: {order.status || "-"}</Text>
      <Text style={styles.text}>Payment Link: {order.paymentLink ? "Yes" : "No"}</Text>

      <Text style={styles.subtitle}>🛒 Items:</Text>
      <Text style={styles.text}>Payment Intent: {order.paymentIntent?.id || "-"}</Text>
<Text style={styles.text}>Status: {order.status || "-"}</Text>

{order.items?.length ? (
  order.items.map((item: any) => (
    <View key={item.variantId} style={styles.item}>
      <Text style={styles.itemTitle}>{item.productId?.title || "Product"}</Text>
      <Text>Variant ID: {item.variantId}</Text>
      <Text>Size: {item.size}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Price: ${item.price}</Text>
    </View>
  ))
) : (
  <Text>No items found.</Text>
)}

      <Text style={styles.subtitle}>📦 Shipping Address</Text>
      {order.shippingAddress ? (
        <>
          <Text>{order.shippingAddress.fullName || "-"}</Text>
          <Text>
            {order.shippingAddress.addressLine1 || "-"}, {order.shippingAddress.addressLine2 || "-"}
          </Text>
          <Text>
            {order.shippingAddress.city || "-"}, {order.shippingAddress.state || "-"}, {order.shippingAddress.pincode || "-"}
          </Text>
          <Text>{order.shippingAddress.country || "-"}</Text>
          <Text>Phone: {order.shippingAddress.phone || "-"}</Text>
        </>
      ) : (
        <Text>No shipping address available.</Text>
      )}

      {order.userNote ? (
        <>
          <Text style={styles.subtitle}>📝 User Note</Text>
          <Text>{order.userNote}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "green" },
  subtitle: { fontSize: 18, fontWeight: "600", marginTop: 16, marginBottom: 6 },
  text: { fontSize: 14, marginBottom: 4 },
  item: { marginBottom: 12, padding: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 6 },
  itemTitle: { fontSize: 16, fontWeight: "500" },
});
