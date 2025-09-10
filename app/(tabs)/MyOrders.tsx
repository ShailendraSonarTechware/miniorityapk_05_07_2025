//previous code to debug
// import React from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import SearchHeader from "../components/SearchHeader";
// import { useRouter } from 'expo-router';

// interface NavItem {
//   icon: React.ReactNode;
//   label: string;
//   route: string;
// }

// interface NavSection {
//   id: string;
//   status: string;
//   statusColor: string;
//   title: string;
//   color: string;
//   size: string;
//   image: string;
//   route: string;
// }

// const myOrders: NavSection[] = [
//   {
//     id: "1",
//     status: "Delivered On 12th July, 2025",
//     statusColor: "green",
//     title: "AQUA WIRELESS BLUETOOTH HEADPHONE WITH MIC",
//     color: "BLACK",
//     size: "",
//     image: "https://i.ibb.co/VcJhKT3d/d7e3c420b9180db83c7e3f1c23c6363e8e72deca.jpg",
//     route: "/order/1",
//   },
//   {
//     id: "2",
//     status: "Returned On 2nd June, 2025",
//     statusColor: "orange",
//     title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
//     color: "MAROON",
//     size: "S",
//     image: "https://i.ibb.co/xtfNS3j3/de909c2fe3957f1cb2e2efb256c1a8db264728a6.png",
//     route: "/order/2",
//   },
//   {
//     id: "3",
//     status: "Order Cancelled",
//     statusColor: "red",
//     title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
//     color: "MAROON",
//     size: "S",
//     image: "https://i.ibb.co/kgCkc2np/af0c5c68e681c86cdca230771f9883d7d803be66.jpg",
//     route: "/order/3",
//   },
// ];

// const bestSellingProducts = [
//   { id: "1", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/yBd217BB/jacket.png" },
//   { id: "2", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/cKKPFVnk/sofa.png" },
//   { id: "3", title: "Feature Product Title", price: 499.0, image: "https://i.ibb.co/MxBg9HBc/pot.png" },
// ];

// export default function MyOrdersScreen() {
//   const router = useRouter();

//   return (
//     <ScrollView style={styles.container}>
//       <SearchHeader />

//       <Text style={styles.sectionTitle}>MY ORDERS</Text>
//       {myOrders.map((order: any, idx) => (
//         <Pressable
//           key={idx}
//           onPress={() => {
//             // router.push(order.route);  // Ensure correct route
//             router.push({ pathname: '/order/[orderId]', params: { orderId: order.id } });
//           }}
//           style={({ pressed }) => [
//             styles.item,
//             pressed && { backgroundColor: '#16a1c0', color: '#ffffff' },
//           ]}
//         >
//           <View style={styles.orderCard}>
//             <Image source={{ uri: order.image }} style={styles.orderImage} />
//             <View style={{ flex: 1 }}>
//               <Text style={{ color: order.statusColor, fontWeight: "600" }}>{order.status}</Text>
//               <Text style={styles.orderTitle}>{order.title}</Text>
//               <Text style={styles.orderDetails}>
//                 COLOR: {order.color} {order.size ? `SIZE: ${order.size}` : ""}
//               </Text>
//               <TouchableOpacity style={styles.reviewBtn}>
//                 <Text style={styles.reviewText}>Add Review</Text>
//                 {[...Array(5)].map((_, idx) => (
//                   <Ionicons key={idx} name="star-outline" size={18} color="#aaa" />
//                 ))}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Pressable>
//       ))}

//       <TouchableOpacity style={styles.viewAllBtn}>
//         <Text style={{ color: "#fff", fontWeight: "600" }}>View All Previous Orders</Text>
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>BEST SELLING PRODUCTS</Text>
//       <FlatList
//         data={bestSellingProducts}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={styles.productCard}>
//             <Image source={{ uri: item.image }} style={styles.productImage} />
//             <Text style={styles.productTitle}>{item.title}</Text>
//             <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 15 },
//   sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10, marginTop: 10 },
//   orderCard: { flexDirection: "row", backgroundColor: "#f9f9f9", padding: 10, marginBottom: 10, borderRadius: 8 },
//   orderImage: { width: 80, height: 100, borderRadius: 1, marginRight: 10 },
//   orderTitle: { fontSize: 14, fontWeight: "600", marginVertical: 3 },
//   orderDetails: { fontSize: 12, color: "#555" },
//   reviewBtn: { flexDirection: "row", alignItems: "center", marginTop: 5 },
//   reviewText: { fontSize: 12, color: "#555", marginRight: 5 },
//   viewAllBtn: { backgroundColor: "#C94F3D", padding: 12, alignItems: "center", borderRadius: 1, marginVertical: 15 },
//   productCard: { width: 150, backgroundColor: "#fff", borderRadius: 8, padding: 10, marginRight: 10, elevation: 2, marginTop: 10, marginBottom: 30 },
//   productImage: { width: "100%", height: 100, borderRadius: 6, marginBottom: 8 },
//   productTitle: { fontSize: 12, fontWeight: "600" },
//   productPrice: { fontSize: 14, fontWeight: "700", marginTop: 4 },
//    item: {
//     // backgroundColor: '#f9f9f9',
//     // paddingVertical: 14,
//     // paddingHorizontal: 12,
//     // borderRadius: 8,
//     // marginBottom: 8,
//     // flexDirection: 'row',
//     // justifyContent: 'space-between',
//     // alignItems: 'center',
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import SearchHeader from "../components/SearchHeader";
import { useRouter } from "expo-router";
import { getOrders } from "../../services/ordersApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyOrdersScreen() {
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const fetchOrders = async () => {
  setLoading(true);
  try {
    const orders = await getOrders(statusFilter, timeFilter);
    setOrders(orders);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, timeFilter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SearchHeader />

      {/* 🔹 Filters */}
      <View style={styles.filterBox}>
        <Text style={styles.filterHeading}>Filter Orders</Text>

        <View style={styles.filterRow}>
          <Ionicons name="pricetags-outline" size={18} color="#555" />
          <Text style={styles.filterLabel}>Order Status</Text>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(itemValue) => setStatusFilter(itemValue)}
            dropdownIconColor="#C94F3D"
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Created" value="created" />
            <Picker.Item label="Ordered" value="ordered" />
            <Picker.Item label="Accepted" value="accepted" />
            <Picker.Item label="Rejected" value="rejected" />
            <Picker.Item label="Shipped" value="shipped" />
            <Picker.Item label="Delivered" value="delivered" />
            <Picker.Item label="Cancelled" value="cancelled" />
            <Picker.Item label="Returned" value="returned" />
            <Picker.Item label="Refunded" value="refunded" />
          </Picker>
        </View>

        <View style={[styles.filterRow, { marginTop: 12 }]}>
          <Ionicons name="time-outline" size={18} color="#555" />
          <Text style={styles.filterLabel}>Order Time</Text>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={timeFilter}
            onValueChange={(itemValue) => setTimeFilter(itemValue)}
            dropdownIconColor="#C94F3D"
          >
            <Picker.Item label="All Time" value="" />
            <Picker.Item label="Last 30 days" value="last30" />
            <Picker.Item label="2024" value="2024" />
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="Older" value="older" />
          </Picker>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Orders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#C94F3D" style={{ marginTop: 20 }} />
      ) : orders.length === 0 ? (
        <Text style={styles.emptyText}>No orders found</Text>
      ) : (
        orders.map((order, idx) => {
          const firstItem = order.items[0];
          return (
            <Pressable
              key={idx}
              onPress={() =>
                router.push({
                  pathname: "/order/[orderId]",
                  params: { orderId: order._id },
                })
              }
              style={({ pressed }) => [
                styles.item,
                pressed && { transform: [{ scale: 0.97 }], opacity: 0.95 },
              ]}
            >
              <View style={styles.orderCard}>
                <Image
                  source={{ uri: firstItem?.productId?.coverImage }}
                  style={styles.orderImage}
                />

                <View style={{ flex: 1 }}>
                  <View style={styles.statusRow}>
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            order.status === "created"
                              ? "#FF9800"
                              : order.status === "delivered"
                              ? "#4CAF50"
                              : "#E53935",
                        },
                      ]}
                    >
                      {order.status.toUpperCase()}
                    </Text>
                    <Text style={styles.dateText}>
                      {formatDate(order.createdAt)}
                    </Text>
                  </View>

                  <Text style={styles.orderTitle} numberOfLines={1}>
                    {firstItem?.productId?.title}
                  </Text>
                  <Text style={styles.orderDetails}>
                    COLOR: {firstItem?.color || "N/A"}{" "}
                    {firstItem?.size ? `| SIZE: ${firstItem?.size}` : ""}
                  </Text>
                  <Text style={styles.orderDetails}>
                    Quantity: {firstItem?.quantity}
                  </Text>
                  <Text style={styles.amountText}>
                    {order.currency} {order.totalAmount}
                  </Text>

                  {/* <TouchableOpacity style={styles.reviewBtn}>
                    <Text style={styles.reviewText}>Add Review</Text>
                    {[...Array(5)].map((_, idx) => (
                      <Ionicons
                        key={idx}
                        name="star-outline"
                        size={18}
                        color="#bbb"
                      />
                    ))}
                  </TouchableOpacity> */}
                </View>
              </View>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 15 },
  filterBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  filterHeading: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#222" },
  filterRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  filterLabel: { fontSize: 14, fontWeight: "600", marginLeft: 6, color: "#444" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: "#fdfdfd",
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 14,
    marginTop: 5,
    color: "#111",
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 40,
    fontSize: 15,
    color: "#777",
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  orderImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: "#f0f0f0",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusText: { fontWeight: "700", fontSize: 13 },
  dateText: { fontSize: 12, color: "#888" },
  orderTitle: { fontSize: 15, fontWeight: "600", marginBottom: 4, color: "#222" },
  orderDetails: { fontSize: 13, color: "#666", marginBottom: 2 },
  amountText: { fontSize: 15, fontWeight: "700", color: "#C94F3D", marginTop: 3 },
  reviewBtn: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  reviewText: { fontSize: 13, color: "#444", marginRight: 6 },
  item: { borderRadius: 14 },
});
