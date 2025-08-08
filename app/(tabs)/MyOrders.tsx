// MyOrdersScreen.tsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchHeader from "../components/SearchHeader";

const myOrders = [
  {
    id: "1",
    status: "Delivered On 12th July, 2025",
    statusColor: "green",
    title: "AQUA WIRELESS BLUETOOTH HEADPHONE WITH MIC",
    color: "BLACK",
    size: "",
    image: "https://i.ibb.co/VcJhKT3d/d7e3c420b9180db83c7e3f1c23c6363e8e72deca.jpg",
  },
  {
    id: "2",
    status: "Returned On 2nd June, 2025",
    statusColor: "orange",
    title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
    color: "MAROON",
    size: "S",
    image: "https://i.ibb.co/xtfNS3j3/de909c2fe3957f1cb2e2efb256c1a8db264728a6.png",
  },
  {
    id: "3",
    status: "Order Cancelled",
    statusColor: "red",
    title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
    color: "MAROON",
    size: "S",
    image: "https://i.ibb.co/kgCkc2np/af0c5c68e681c86cdca230771f9883d7d803be66.jpg",
  },
];

const bestSellingProducts = [
  { id: "1", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/yBd217BB/jacket.png" },
  { id: "2", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/cKKPFVnk/sofa.png" },
  { id: "3", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/MxBg9HBc/pot.png" },
];

export default function MyOrdersScreen() {
  return (
    <ScrollView style={styles.container}>

        <SearchHeader/>
      {/* My Orders */}
      <Text style={styles.sectionTitle}>MY ORDERS</Text>
      {myOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Image source={{ uri: order.image }} style={styles.orderImage} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: order.statusColor, fontWeight: "600" }}>{order.status}</Text>
            <Text style={styles.orderTitle}>{order.title}</Text>
            <Text style={styles.orderDetails}>
              COLOR: {order.color} {order.size ? `   SIZE: ${order.size}` : ""}
            </Text>
            <TouchableOpacity style={styles.reviewBtn}>
              <Text style={styles.reviewText}>Add Review</Text>
              <Ionicons name="star-outline" size={18} color="#aaa" />
              <Ionicons name="star-outline" size={18} color="#aaa" />
              <Ionicons name="star-outline" size={18} color="#aaa" />
              <Ionicons name="star-outline" size={18} color="#aaa" />
              <Ionicons name="star-outline" size={18} color="#aaa" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllBtn}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>View All Previous Orders</Text>
      </TouchableOpacity>

      {/* Best Selling Products */}
      <Text style={styles.sectionTitle}>BEST SELLING PRODUCTS</Text>
      <FlatList
        data={bestSellingProducts}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, marginTop: 10 },
  orderCard: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 8 },
  orderImage: { width: 80, height: 100, borderRadius: 1, marginRight: 10 },
  orderTitle: { fontSize: 14, fontWeight: "600", marginVertical: 3 },
  orderDetails: { fontSize: 12, color: "#555" },
  reviewBtn: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  reviewText: { fontSize: 12, color: "#555", marginRight: 5 },
  viewAllBtn: { backgroundColor: "#C94F3D", padding: 12, alignItems: "center", borderRadius: 1, marginVertical: 15 },
  productCard: { width: 150, backgroundColor: "#fff", borderRadius: 8, padding: 10, marginRight: 10, elevation: 2 , marginTop: 10, marginBottom: 30},
  productImage: { width: "100%", height: 100, borderRadius: 6, marginBottom: 8 },
  productTitle: { fontSize: 12, fontWeight: "600" },
  productPrice: { fontSize: 14, fontWeight: "700", marginTop: 4 },
});
