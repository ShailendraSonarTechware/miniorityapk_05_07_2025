//previous code to see debug
// import React, { useEffect, useState } from "react";
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
// import SearchHeader from "../components/SearchHeader";

// // Define the Order type
// interface Order {
//     id: string;
//     status: string;
//     statusColor: string;
//     title: string;
//     color: string;
//     size: string;
//     image: string;
//     paymentMethod: string;
//     totalPrice: string;
// }

// const myOrders: Order[] = [
//     {
//         id: "1",
//         status: "Delivered On 12th July, 2025",
//         statusColor: "#079a4a",
//         title: "AQUA WIRELESS BLUETOOTH HEADPHONE WITH MIC",
//         color: "BLACK",
//         size: "",
//         image: "https://i.ibb.co/VcJhKT3d/d7e3c420b9180db83c7e3f1c23c6363e8e72deca.jpg",
//         paymentMethod: "Credit Card Ending with XXXX 1234",
//         totalPrice: "$877.00"
//     },
//     {
//         id: "2",
//         status: "Returned On 2nd June, 2025",
//         statusColor: "orange",
//         title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
//         color: "MAROON",
//         size: "S",
//         image: "https://i.ibb.co/xtfNS3j3/de909c2fe3957f1cb2e2efb256c1a8db264728a6.png",
//         paymentMethod: "Credit Card Ending with XXXX 5678",
//         totalPrice: "$499.00"
//     },
//     {
//         id: "3",
//         status: "Order Cancelled",
//         statusColor: "red",
//         title: "MEN REGULAR FIT PRINTED SPREAD COLLAR...",
//         color: "MAROON",
//         size: "S",
//         image: "https://i.ibb.co/kgCkc2np/af0c5c68e681c86cdca230771f9883d7d803be66.jpg",
//         paymentMethod: "Credit Card Ending with XXXX 5678",
//         totalPrice: "$499.00"
//     },
// ];

// export default function OrderDetailsPage(): React.JSX.Element {
//     const router = useRouter();
//     const params = useLocalSearchParams();
//     const orderId: string | string[] = params.orderId || params.id || '';

//     const [orderData, setOrderData] = useState<Order | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [rating, setRating] = useState<number>(0);

//     useEffect(() => {
//         const orderIdString: string = Array.isArray(orderId) ? orderId[0] : String(orderId);

//         if (orderIdString) {
//             const foundOrder: Order | undefined = myOrders.find((item: Order) => item.id === orderIdString);

//             if (foundOrder) {
//                 setOrderData(foundOrder);
//             }
//         }

//         setLoading(false);
//     }, [orderId]);

//     if (loading) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.loadingText}>Loading...</Text>
//             </View>
//         );
//     }

//     if (!orderData) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Order not found</Text>
//                 <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
//                     <Text style={styles.goBackText}>Go Back</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <ScrollView style={styles.container}>

//             <SearchHeader />

//             <View style={styles.imageContainer}>
//                 <Image source={{ uri: orderData.image }} style={styles.image} />
//             </View>

//             <View style={styles.detailsContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.orderIdText}>ORDER ID: #{orderData.id}</Text>
//                     <Text style={styles.title}>{orderData.title}</Text>
//                     <Text style={[styles.statusText, { backgroundColor: orderData.statusColor }]}>
//                         {orderData.status}
//                     </Text>
//                 </View>

//                 {/* Star Rating Section (Horizontal) */}
//                 <View style={styles.ratingSection}>
//                     <View style={styles.ratingContainer}>
//                         <Text style={styles.rateText}>Add a review</Text>
//                         <View style={styles.starsContainer}>
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <TouchableOpacity key={star} onPress={() => setRating(star)}>
//                                     <Text style={star <= rating ? styles.selectedStar : styles.star}>★</Text>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 </View>

//                 <View style={styles.details}>
//                     <Text style={styles.sectionTitle}>DELIVERED ADDRESS</Text>
//                     <Text style={styles.sectionContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
//                 </View>

//                 <View style={styles.details}>
//                     <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
//                     <Text style={styles.sectionContent}>Phone: 1234567890</Text>
//                     <Text style={styles.sectionContent}>Email: abcd@gmail.com</Text>
//                 </View>

//                 <View style={styles.details}>
//                     <Text style={styles.sectionTitle}>PAYMENT</Text>
//                     <Text style={styles.sectionContent}>Paid By: {String(orderData.paymentMethod)}</Text>
//                     <Text style={styles.sectionContent}>Total Order Price: {String(orderData.totalPrice)}</Text>

//                 </View>
//             </View>



//             <TouchableOpacity style={styles.downloadButton}>
//                 <Text style={styles.downloadText}>Download Invoice</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     header: {
//         marginBottom: 20,
//         marginTop: 70
//     },
//     orderIdText: {
//         fontSize: 10,
//         fontWeight: "bold",
//         color: "#acacac",
//         textAlign: "center",
//     },
//     title: {
//         fontSize: 13,
//         fontWeight: "bold",
//         color: "#000",
//         marginTop: 5,
//         textAlign: "center",
//     },
//     statusText: {
//         fontSize: 14,
//         paddingVertical: 8,
//         color: "#fff",
//         textAlign: "center",
//         borderRadius: 1,
//         marginTop: 10,
//         width: "100%",
//     },
//     imageContainer: {
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 15,  // Optional: Adjust top margin if needed
//     },
//     image: {
//         width: 150,
//         height: 150,
//         resizeMode: "contain",
//         marginTop: 15,
//         borderRadius: 10,
//         zIndex: 99,
//     },

//     detailsContainer: {
//         backgroundColor: "rgba(0, 0, 0, 0.05)",
//         borderRadius: 10,
//         padding: 15,
//         marginTop:-50
//     },
//     details: {
//         marginTop: 15,
//     },
//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: "bold",
//         marginBottom: 5,
//         color: "#333",
//     },
//     sectionContent: {
//         fontSize: 14,
//         color: "#acacac",
//         marginBottom: 5,
//     },
//     ratingSection: {
//         marginTop: 2,
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         backgroundColor: "#f9f9f9",
//         borderRadius: 1,
//         elevation: 1,
//     },
//     ratingContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     rateText: {
//         fontSize: 14,
//         fontWeight: "bold",
//         color: "#333",
//     },
//     starsContainer: {
//         flexDirection: "row",
//         justifyContent: "flex-start",
//     },
//     star: {
//         fontSize: 18,
//         color: "#ccc",
//         marginRight: 5,
//     },
//     selectedStar: {
//         fontSize: 18,
//         color: "#FFD700",
//         marginRight: 5,
//     },
//     downloadButton: {
//         marginTop: 20,
//         marginBottom: 50,
//         padding: 12,
//         backgroundColor: "#ce5f44",
//         borderRadius: 1,
//         alignItems: "center",
//     },
//     downloadText: {
//         color: "#fff",
//         fontSize: 16,
//     },
//     loadingText: {
//         fontSize: 18,
//         textAlign: "center",
//     },
//     errorText: {
//         fontSize: 18,
//         color: "red",
//         textAlign: "center",
//     },
//     goBackButton: {
//         marginTop: 20,
//         padding: 10,
//         backgroundColor: "#ccc",
//         borderRadius: 5,
//         alignItems: "center",
//     },
//     goBackText: {
//         color: "#000",
//         fontSize: 16,
//     },
// });


import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import SearchHeader from "../components/SearchHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the Order type (from backend)
interface Order {
  _id: string;
  status: string;
  items: {
    productId: { title: string; coverImage: string };
    color: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
  };
}

export default function OrderDetailsPage(): React.JSX.Element {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId: string = Array.isArray(params.orderId)
    ? params.orderId[0]
    : String(params.orderId || "");

  const [orderData, setOrderData] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("authToken");
        if (!token) return;

        const res = await fetch(
          `https://api.minorityownedbusiness.info/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("API response:", data);   // 👈 Add this
        setOrderData(data.order); // API returns { order: {...} }
      } catch (err) {
        console.error("Error fetching order details", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ce5f44" />
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.goBackButton}
        >
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Take first product image & title (if multiple items)
  const firstItem = orderData.items[0];

  return (
    <ScrollView style={styles.container}>
      <SearchHeader />

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: firstItem?.productId?.coverImage }}
          style={styles.image}
        />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.orderIdText}>ORDER ID: #{orderData._id}</Text>
          <Text style={styles.title}>{firstItem?.productId?.title}</Text>
          <Text
            style={[
              styles.statusText,
              {
                backgroundColor:
                  orderData.status === "delivered"
                    ? "#079a4a"
                    : orderData.status === "cancelled"
                    ? "red"
                    : "orange",
              },
            ]}
          >
            {orderData.status.toUpperCase()} •{" "}
            {new Date(orderData.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Star Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            <Text style={styles.rateText}>Add a review</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text
                    style={
                      star <= rating ? styles.selectedStar : styles.star
                    }
                  >
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Address */}
        <View style={styles.details}>
          <Text style={styles.sectionTitle}>DELIVERED ADDRESS</Text>
          <Text style={styles.sectionContent}>
            {orderData.shippingAddress.fullName}
          </Text>
          <Text style={styles.sectionContent}>
            {orderData.shippingAddress.addressLine1},{" "}
            {orderData.shippingAddress.addressLine2}
          </Text>
          <Text style={styles.sectionContent}>
            {orderData.shippingAddress.city},{" "}
            {orderData.shippingAddress.state}
          </Text>
        </View>

        {/* Contact */}
        <View style={styles.details}>
          <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
          <Text style={styles.sectionContent}>
            Phone: {orderData.shippingAddress.phone}
          </Text>
          <Text style={styles.sectionContent}>Email: user@email.com</Text>
        </View>

        {/* Payment */}
        <View style={styles.details}>
          <Text style={styles.sectionTitle}>PAYMENT</Text>
          <Text style={styles.sectionContent}>
            Paid By: {String(orderData.paymentMethod)}
          </Text>
          <Text style={styles.sectionContent}>
            Total Order Price: {orderData.currency} {orderData.totalAmount}
          </Text>
        </View>
      </View>

      {/* Invoice */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  header: { marginBottom: 20, marginTop: 70 },
  orderIdText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#acacac",
    textAlign: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
    textAlign: "center",
  },
  statusText: {
    fontSize: 14,
    paddingVertical: 8,
    color: "#fff",
    textAlign: "center",
    borderRadius: 1,
    marginTop: 10,
    width: "100%",
  },
  imageContainer: { justifyContent: "center", alignItems: "center", marginTop: 15 },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginTop: 15,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 10,
    padding: 15,
    marginTop: -50,
  },
  details: { marginTop: 15 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  sectionContent: { fontSize: 14, color: "#acacac", marginBottom: 5 },
  ratingSection: {
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 1,
    elevation: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateText: { fontSize: 14, fontWeight: "bold", color: "#333" },
  starsContainer: { flexDirection: "row", justifyContent: "flex-start" },
  star: { fontSize: 18, color: "#ccc", marginRight: 5 },
  selectedStar: { fontSize: 18, color: "#FFD700", marginRight: 5 },
  downloadButton: {
    marginTop: 20,
    marginBottom: 50,
    padding: 12,
    backgroundColor: "#ce5f44",
    borderRadius: 1,
    alignItems: "center",
  },
  downloadText: { color: "#fff", fontSize: 16 },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
  goBackButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
  },
  goBackText: { color: "#000", fontSize: 16 },
});
