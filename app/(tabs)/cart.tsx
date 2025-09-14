import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router"; 
import { useFocusEffect } from "@react-navigation/native";
import { getCart, updateCartItemByComposite, removeCartItemByComposite } from "../../services/cartApi";
import { initiateOrder } from "../../services/checkoutApi"; // Stripe Order API
import AddressForm from "../components/AddressForm"; // Address Form Component
import { useStripePayment } from "../../hooks/useStripePayment"; // Custom hook for Stripe payment
import { useRouter } from "expo-router"; 

// Cart item type
interface CartItem {
  title: string;
  productId: string;
  variantId: string;
  businessId: string;
  quantity: number;
  size: string;
  color: string;
  label: string;
  stock: number;
  sku: string;
  salePrice: number;
  discountEndDate: string | null;
  price: number;
  selectedSizePrice: number;
  imageUrl: string;
  allowBackorder: boolean;
}

interface Cart {
  items: CartItem[];
  shippingAddress: any;
  userNote?: string;
}

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const didMountRef = useRef(false);
  const router = useRouter(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState<any>(null);
  const { ready, prepare, pay } = useStripePayment();
  const [loadingPay, setLoadingPay] = useState(false);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      const data: Cart = await getCart();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart only when user taps on the Cart tab
  useFocusEffect(
    useCallback(() => {
      if (didMountRef.current) {
        fetchCart(); 
      } else {
        didMountRef.current = true;
        fetchCart();
      }
    }, [])
  );

  const refreshCart = async () => {
    try {
      const freshCart = await getCart();
      setCart(freshCart);
    } catch (err) {
      console.error("Error refreshing cart:", err);
    }
  };

  const increment = async (item: CartItem) => {
    try {
      await updateCartItemByComposite({
        productId: item.productId,
        variantId: item.variantId,
        size: item.size,
        businessId: item.businessId,
        quantity: item.quantity + 1,
      });
      await refreshCart();
    } catch (err) {
      console.error("Error incrementing:", err);
    }
  };

  const decrement = async (item: CartItem) => {
    if (item.quantity <= 1) return;
    try {
      await updateCartItemByComposite({
        productId: item.productId,
        variantId: item.variantId,
        size: item.size,
        businessId: item.businessId,
        quantity: item.quantity - 1,
      });
      await refreshCart();
    } catch (err) {
      console.error("Error decrementing:", err);
    }
  };

  const handleRemove = async (item: CartItem) => {
    try {
      await removeCartItemByComposite({
        productId: item.productId,
        variantId: item.variantId,
        size: item.size,
        businessId: item.businessId,
      });
      await refreshCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleStripeCheckout = async () => {
    if (!cart) return;
    if (!address) {
      Alert.alert("Address Required", "Please add a delivery address before checkout.");
      return;
    }

    try {
      setLoadingPay(true);

      const payload = {
        items: cart.items.map((it: CartItem) => ({
          productId: it.productId,
          variantId: it.variantId,
          size: it.size,
          quantity: it.quantity,
          price: it.price,
          image: it.imageUrl,
          title: it.title,
          color: it.color,
          label: it.label,
        })),
        shippingAddress: {
          fullName: address.name,
          phone: address.phone,
          addressLine1: address.address1,
          addressLine2: address.address2,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.zip,
        },
        userNote: cart.userNote ?? "",
        paymentLink: true,
      };

      console.log("Checkout Payload:", payload);

      const res = await initiateOrder(payload);
      if (!res?.clientSecret) {
        Alert.alert("Checkout", "Could not start payment. Please try again.");
        return;
      }

      const initRes = await prepare(res.clientSecret);
      if (initRes.error) {
        Alert.alert("Payment", initRes.error.message ?? "Failed to initialize payment.");
        return;
      }

      const payRes = await pay();
      if (payRes.error) {
        Alert.alert("Payment", payRes.error.message ?? "Payment failed/cancelled.");
        return;
      }

      Alert.alert("Success", "Payment completed!");
      refreshCart();

      // Navigate to OrderSuccess screen after payment
      router.push(`../OrderSuccess/${res.orderId}/${res.groupOrderId}`);
    } catch (e: any) {
      console.error(e);
      Alert.alert("Payment Error", "Something went wrong with your payment.");
    } finally {
      setLoadingPay(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" style={{ flex: 1, justifyContent: "center" }} />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  const totalMRP = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cart.items.reduce(
    (sum, item) => sum + (item.price - (item.salePrice || item.price)) * item.quantity,
    0
  );
  const shippingCharges = 10;
  const totalOrder = totalMRP - totalDiscount + shippingCharges;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>MY CART</Text>

      {/* Address Form */}
      <View style={styles.addressContainer}>
        {address ? (
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>Delivery Address</Text>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text style={styles.addressPhone}>{address.phone}</Text>
            <Text style={styles.addressLine}>
              {address.address1}, {address.city}, {address.state} - {address.zip}, {address.country}
            </Text>
            {address.default && <Text style={styles.defaultBadge}>Default</Text>}
          </View>
        ) : (
          <Text style={styles.noAddress}>No Address Added</Text>
        )}
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>{address ? "Edit Address" : "Add Address"}</Text>
        </TouchableOpacity>
        <AddressForm visible={modalVisible} onClose={() => setModalVisible(false)} onSave={(addr) => setAddress(addr)} />
      </View>

      {/* Cart Items */}
      {cart.items.map((item) => (
        <View key={`${item.productId}-${item.variantId}`} style={styles.cartItem}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>Color: {item.color}</Text>
            <Text style={styles.itemText}>Size: {item.size}</Text>
            <View style={styles.quantityContainer}>
              <Pressable onPress={() => decrement(item)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <Pressable onPress={() => increment(item)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => handleRemove(item)}>
              <Text style={{ color: "red", marginTop: 6 }}>Remove</Text>
            </Pressable>
          </View>
          <Text style={styles.price}>₹{item.salePrice || item.price}</Text>
        </View>
      ))}

      {/* Pricing Details */}
      <Text style={styles.sectionTitle}>PRICING DETAILS</Text>
      <View style={styles.priceDetails}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total MRP</Text>
          <Text style={styles.priceValue}>₹{totalMRP.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Discount</Text>
          <Text style={styles.priceValue}>- ₹{totalDiscount.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping Charges</Text>
          <Text style={styles.priceValue}>₹{shippingCharges.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.totalOrder}>Total Order: ₹{totalOrder.toFixed(2)}</Text>

      {/* Stripe Checkout Button */}
      <TouchableOpacity
        style={[styles.checkoutButton, (!ready || loadingPay) && { opacity: 0.5 }]}
        onPress={handleStripeCheckout}
        disabled={loadingPay || !ready}
      >
        <Text style={styles.checkoutText}>
          {loadingPay ? "Processing..." : "Pay Now"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16, marginTop: 16 },
  cartItem: { flexDirection: "row", marginBottom: 24, alignItems: "center" },
  productImage: { width: 80, height: 100, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemTitle: { fontWeight: "bold", marginBottom: 4, fontSize: 14 },
  itemText: { color: "#555", fontSize: 12, marginBottom: 2 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  qtyText: { fontSize: 16 },
  qtyValue: { marginHorizontal: 12, fontSize: 16 },
  price: { marginLeft: 12, fontWeight: "bold", fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  priceDetails: { marginBottom: 16 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  priceLabel: { fontSize: 14, color: "#555" },
  priceValue: { fontSize: 14, fontWeight: "bold" },
  totalOrder: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  checkoutButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 30,
  },
  checkoutText: { textAlign: "center", fontSize: 16, fontWeight: "bold" },
  addressContainer: { marginTop: 20 },
  addressCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  addressTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#111827" },
  addressName: { fontSize: 15, fontWeight: "500", color: "#1f2937" },
  addressPhone: { fontSize: 14, color: "#374151", marginBottom: 5 },
  addressLine: { fontSize: 14, color: "#4b5563" },
  defaultBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#E07B39",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "600",
  },
  noAddress: { marginBottom: 10, fontSize: 14, color: "#6b7280" },
  addBtn: {
    backgroundColor: "#E07B39",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
