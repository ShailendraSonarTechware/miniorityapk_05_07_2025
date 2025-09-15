import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";  // Correct import for expo-router

export default function OrderSuccess() {
  // Using useLocalSearchParams to access dynamic route parameters for nested routes
  const { orderId, groupOrderId, clientSecret } = useLocalSearchParams();  // Access dynamic parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Order Placed Successfully!</Text>
      <Text style={styles.text}>Order ID: {orderId}</Text>
      <Text style={styles.text}>Group Order ID: {groupOrderId}</Text>
      <Text style={styles.text}>Client Secret: {groupOrderId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 6 },
});


// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
// import { useLocalSearchParams } from "expo-router";

// export default function OrderSuccess() {
//   const { paymentIntentId } = useLocalSearchParams();
//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (paymentIntentId) {
//       const id = Array.isArray(paymentIntentId) ? paymentIntentId[0] : paymentIntentId;
//       fetchOrderDetails(id);
//     }
//   }, [paymentIntentId]);

//   const fetchOrderDetails = async (id: string) => {
//     try {
//       const res = await fetch(`https://api.mosaicbizhub.com/api/orders/retrieve-intent/${id}`);
//       const data = await res.json();
//       console.log("Order data:", JSON.stringify(data, null, 2));
//       setOrder(data);
//     } catch (err) {
//       console.error("Error fetching order:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#000" />
//         <Text>Loading order details...</Text>
//       </View>
//     );
//   }

//   if (!order) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "red" }}>Failed to load order details.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>🎉 Order Placed Successfully!</Text>

//       <Text style={styles.text}>Payment Intent: {order.paymentIntentId}</Text>
//       <Text style={styles.text}>Status: {order.status}</Text>
//       <Text style={styles.text}>Payment Link: {order.paymentLink ? "Yes" : "No"}</Text>

//       <Text style={styles.subtitle}>🛒 Items:</Text>
//       {order.items?.map((item: any, idx: number) => (
//         <View key={idx} style={styles.item}>
//           <Text style={styles.itemTitle}>{item.title}</Text>
//           <Text>Variant ID: {item.variantId}</Text>
//           <Text>Size: {item.size}</Text>
//           <Text>Quantity: {item.quantity}</Text>
//         </View>
//       ))}

//       <Text style={styles.subtitle}>📦 Shipping Address</Text>
//       <Text>{order.shippingAddress.fullName}</Text>
//       <Text>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</Text>
//       <Text>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pincode}</Text>
//       <Text>{order.shippingAddress.country}</Text>
//       <Text>Phone: {order.shippingAddress.phone}</Text>

//       {order.userNote ? (
//         <>
//           <Text style={styles.subtitle}>📝 User Note</Text>
//           <Text>{order.userNote}</Text>
//         </>
//       ) : null}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 22, fontWeight: "bold", marginBottom: 16, color: "green" },
//   subtitle: { fontSize: 18, fontWeight: "600", marginTop: 16, marginBottom: 6 },
//   text: { fontSize: 14, marginBottom: 4 },
//   item: { marginBottom: 12, padding: 8, borderWidth: 1, borderColor: "#ddd", borderRadius: 6 },
//   itemTitle: { fontSize: 16, fontWeight: "500" },
// });
