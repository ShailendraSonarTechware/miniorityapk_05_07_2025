import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import SearchHeader from "../components/SearchHeader";
import {
  getCart,
  updateCartItemByComposite,
  removeCartItemByComposite,
  addItemToCart, // ✅ make sure you have this in cartApi
} from "../../services/cartApi";
import { createBooking } from "../../services/createBooking";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";
import AddressForm from "../components/AddressForm";
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

// Cart type
interface Cart {
  _id: string;
  userId: string;
  businessId: string;
  items: CartItem[];
  totalItems: number;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Cart() {
  //  const { cart, fetchCart } = useCart(); // assuming you have fetchCart in context
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const didMountRef = useRef(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState<any>(null);
  // 🔹 Fetch cart
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

  // ✅ Fetch only when user taps on the Cart tab
  useFocusEffect(
    useCallback(() => {
      if (didMountRef.current) {
        fetchCart(); // run only when coming back via tab press
      } else {
        didMountRef.current = true;
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

  // 🔹 Checkout
  const handleCheckout = async () => {
    if (!cart) return;
    try {
      const res = await createBooking({ cartId: cart._id });
      console.log("✅ Order placed:", res);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#FF8C00"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your cart is empty</Text>
      </View>
    );
  }

  // 🔹 Pricing
  const totalMRP = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cart.items.reduce(
    (sum, item) =>
      sum + (item.price - (item.salePrice || item.price)) * item.quantity,
    0
  );
  const shippingCharges = 10;
  const totalOrder = totalMRP - totalDiscount + shippingCharges;

  return (
    <ScrollView style={styles.container}>
      <SearchHeader />

      {/* address form  */}
      <View style={styles.addressContainer}>
        {address ? (
          <View style={styles.addressCard}>
            <Text style={styles.addressTitle}>Delivery Address</Text>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text style={styles.addressPhone}>{address.phone}</Text>
            <Text style={styles.addressLine}>
              {address.address1}{address.address2 ? `, ${address.address2}` : ""}
            </Text>
            <Text style={styles.addressLine}>
              {address.city}, {address.state} - {address.zip}
            </Text>
            <Text style={styles.addressLine}>{address.country}</Text>

            {address.default && <Text style={styles.defaultBadge}>Default</Text>}
          </View>
        ) : (
          <Text style={styles.noAddress}>No Address Added</Text>
        )}

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addBtnText}>
            {address ? "Edit Address" : "Add Address"}
          </Text>
        </TouchableOpacity>

        <AddressForm
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={(addr) => setAddress(addr)}
        />
      </View>


      <Text style={styles.header}>MY CART</Text>

      {cart.items.map((item) => (
        <View
          key={`${item.productId}-${item.variantId}-${item.size}`} // ✅ stable key
          style={styles.cartItem}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>COLOR: {item.color}</Text>
            <Text style={styles.itemText}>SIZE: {item.size}</Text>
            <View style={styles.quantityContainer}>
              <Pressable
                onPress={() => decrement(item)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <Pressable
                onPress={() => increment(item)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => handleRemove(item)}>
              <Text style={{ color: "red", marginTop: 6 }}>Remove</Text>
            </Pressable>
          </View>
          <Text style={styles.price}>${item.salePrice || item.price}</Text>
        </View>
      ))}

      {/* Pricing Section */}
      <Text style={styles.sectionTitle}>PRICING DETAILS</Text>
      <View style={styles.priceDetails}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total MRP</Text>
          <Text style={styles.priceValue}>${totalMRP.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Total Discount</Text>
          <Text style={styles.priceValue}>- ${totalDiscount.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping Charges</Text>
          <Text style={styles.priceValue}>${shippingCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Item Count</Text>
          <Text style={styles.priceValue}>{cart.totalItems}</Text>
        </View>
      </View>

      <Text style={styles.totalOrder}>
        Total Order: ${totalOrder.toFixed(2)}
      </Text>

      <View style={styles.couponsSection}>
        <View style={styles.couponsRow}>
          <Text style={styles.couponsTitle}>Best Coupons for You</Text>
          <Text style={styles.viewCouponsText}>View All Coupons</Text>
        </View>
      </View>

      <View style={styles.couponSection}>
        <Text style={styles.couponLabel}>ENTER COUPON CODE:</Text>
        <TextInput
          style={styles.couponInput}
          placeholder="Enter coupon code..."
          placeholderTextColor="#999"
        />
      </View>

      <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Proceed To Checkout</Text>
      </Pressable>



      {/* Terms and Conditions and Privacy Policy */}
      <View style={styles.termsSection}>
        <Text style={styles.termsText}>
          By proceeding with this order, you agree to our
          <Text style={styles.termsLink}> Terms & Conditions</Text> and
          <Text style={styles.termsLink}> Privacy Policy</Text>.
        </Text>
      </View>

      {/* Footer Image Section */}
      <View style={styles.footerContainer}>
        <View style={styles.footerItem}>
          <Image
            source={{
              uri: "https://i.ibb.co/6J80kz5y/7fadd64536b28293db70d663aa9afd29e5db7826.png",
            }}
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Genuine Product</Text>
        </View>
        <View style={styles.footerItem}>
          <Image
            source={{
              uri: "https://i.ibb.co/fz5NQfW3/cb83b470a4a674d4310ad441f74a92e3b763477f.png",
            }}
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Support Minority Businesses</Text>
        </View>
        <View style={styles.footerItem}>
          <Image
            source={{
              uri: "https://i.ibb.co/60SB2RwH/05ca92f1b294061fa0bcec1fb6b85bca6bcef732.png",
            }}
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Secure Payment</Text>
        </View>
      </View>
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
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
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: { fontSize: 14, color: "#555" },
  priceValue: { fontSize: 14, fontWeight: "bold" },
  totalOrder: { fontSize: 16, fontWeight: "bold", marginBottom: 16 },
  checkoutButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 14,
    borderRadius: 6,
  },
  couponSection: { marginBottom: 16 },
  couponLabel: { fontWeight: "600", marginBottom: 8 },
  couponInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
  },
  checkoutText: { textAlign: "center", fontSize: 16, fontWeight: "bold" },
  couponsSection: { marginTop: 16, marginBottom: 16 },
  couponsRow: { flexDirection: "row", justifyContent: "space-between" },
  couponsTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  viewCouponsText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "right",
  },

  termsSection: { marginTop: 16, alignItems: "center" },
  termsText: { fontSize: 14, color: "#555", textAlign: "center" },
  termsLink: { color: "#ce5f44", fontWeight: "600" },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: "#fff6e0",
    marginTop: 20,
    borderRadius: 12,
  },
  footerItem: { alignItems: "center", maxWidth: 90 },
  footerLogo: { width: 50, height: 50, marginBottom: 8, resizeMode: "contain" },
  footerText: { fontSize: 12, color: "#555", textAlign: "center" },
  addressContainer: {
    marginTop: 20,
  },
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
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  addressName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1f2937",
  },
  addressPhone: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },
  addressLine: {
    fontSize: 14,
    color: "#4b5563",
  },
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
  noAddress: {
    marginBottom: 10,
    fontSize: 14,
    color: "#6b7280",
  },
  addBtn: {
    backgroundColor: "#E07B39",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
