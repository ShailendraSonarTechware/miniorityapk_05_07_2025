import { View, Text, ScrollView, Image, Pressable, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import SearchHeader from '../components/SearchHeader';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'MEN REGULAR FIT PRINTED SPREAD COLLAR...',
      color: 'MAROON',
      size: 'S',
      price: 289,
       image: { uri: 'https://i.ibb.co/yBd217BB/jacket.png' },
      quantity: 1,
    },
    {
      id: 2,
      title: 'MEN REGULAR FIT PRINTED SPREAD COLLAR...',
      color: 'MAROON',
      size: 'S',
      price: 289,
       image: { uri: 'https://i.ibb.co/yBd217BB/jacket.png' },
      quantity: 1,
    },
  ]);

  const increment = (id) => {
    console.log('Incrementing item with id:', id);  // Debugging log
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    console.log('Decrementing item with id:', id);  // Debugging log
    setCartItems(items =>
      items.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalMRP = 4989;
  const totalDiscount = 4122;
  const shippingCharges = 10;
  const totalOrder = totalMRP - totalDiscount + shippingCharges;

  return (
    <ScrollView style={styles.container}>

        <SearchHeader/>

      <Text style={styles.header}>MY CART</Text>

      {cartItems.map(item => (
        <View key={item.id.toString()} style={styles.cartItem}>
          <Image source={item.image} style={styles.productImage} resizeMode="contain" />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>COLOR: {item.color}</Text>
            <Text style={styles.itemText}>SIZE: {item.size}</Text>
            <View style={styles.quantityContainer}>
              <Pressable onPress={() => decrement(item.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <Pressable onPress={() => increment(item.id)} style={styles.qtyButton}>
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      ))}

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
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>${(totalMRP - totalDiscount).toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping Charges</Text>
          <Text style={styles.priceValue}>${shippingCharges.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Delivery Charges</Text>
          <Text style={styles.priceValue}>$0.00</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Item Count</Text>
          <Text style={styles.priceValue}>{cartItems.length}</Text>
        </View>
      </View>

      <Text style={styles.totalOrder}>Total Order: ${totalOrder.toFixed(2)}</Text>

        {/* Best Coupons Section */}
      <View style={styles.couponsSection}>
        <View style={styles.couponsRow}>
          <Text style={styles.couponsTitle}>Best Coupons for You</Text>
          <Text style={styles.viewCouponsText}>View All Coupons</Text>
        </View>
      </View>

      <View style={styles.couponSection}>
        <Text style={styles.couponLabel}>ENTER COUPON CODE:</Text>
        <TextInput style={styles.couponInput} placeholder="Enter coupon code..." placeholderTextColor="#999" />
      </View>

      <Pressable style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed To Checkout</Text>
      </Pressable>
{/* Terms and Conditions and Privacy Policy */}
      <View style={styles.termsSection}>
        <Text style={styles.termsText}>By proceeding with this order, you agree to our 
          <Text style={styles.termsLink}> Terms & Conditions</Text> and
          <Text style={styles.termsLink}> Privacy Policy</Text>.
        </Text>
      </View>

      {/* Footer Image Section */}
      <View style={styles.footerContainer}>
        <View style={styles.footerItem}>
          <Image 
            source={{ uri: 'https://i.ibb.co/6J80kz5y/7fadd64536b28293db70d663aa9afd29e5db7826.png' }} // Replace with actual logo path
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Genuine Product</Text>
        </View>
        <View style={styles.footerItem}>
          <Image 
            source={{ uri: 'https://i.ibb.co/fz5NQfW3/cb83b470a4a674d4310ad441f74a92e3b763477f.png' }} // Replace with actual logo path
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Support Minority Businesses</Text>
        </View>
        <View style={styles.footerItem}>
          <Image 
            source={{ uri: 'https://i.ibb.co/60SB2RwH/05ca92f1b294061fa0bcec1fb6b85bca6bcef732.png' }} // Replace with actual logo path
            style={styles.footerLogo}
          />
          <Text style={styles.footerText}>Secure Payment</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 , marginTop: 16 },
  cartItem: { flexDirection: 'row', marginBottom: 24, alignItems: 'center' },
  productImage: { width: 80, height: 100, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemTitle: { fontWeight: 'bold', marginBottom: 4, fontSize: 14 },
  itemText: { color: '#555', fontSize: 12, marginBottom: 2 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyButton: { paddingHorizontal: 12, paddingVertical: 4, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  qtyText: { fontSize: 16 },
  qtyValue: { marginHorizontal: 12, fontSize: 16 },
  price: { marginLeft: 12, fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  priceDetails: { marginBottom: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }, // Left-right alignment
  priceLabel: { fontSize: 14, color: '#555' },
  priceValue: { fontSize: 14, fontWeight: 'bold' },
  totalOrder: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  couponSection: { marginBottom: 16 },
  couponLabel: { fontWeight: '600', marginBottom: 8 },
  couponInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, fontSize: 14 },
  checkoutButton: { backgroundColor: '#FFC107', paddingVertical: 14, borderRadius: 6 },
  checkoutText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
 // Coupons Section Styles
  couponsSection: { marginTop: 16, marginBottom: 16 },
  couponsRow: { flexDirection: 'row', justifyContent: 'space-between' }, // Row layout for left and right alignment
  couponsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  viewCouponsText: { fontSize: 14, fontWeight: 'bold', color: '#007bff', textAlign: 'right' }, // Right aligned text
  // Footer section styles
  footerContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 16, paddingBottom: 32, backgroundColor: '#fff6e0' , marginTop:20},
  footerItem: { alignItems: 'center' },
  footerLogo: { width: 50, height: 50, marginBottom: 8 },
  footerText: { fontSize: 12, color: '#555' },
    // Terms and Conditions
  termsSection: { marginTop: 16, alignItems: 'center' },
  termsText: { fontSize: 14, color: '#555' },
  termsLink: { color: '#ce5f44' }, // Red color for both terms and privacy policy links
});
