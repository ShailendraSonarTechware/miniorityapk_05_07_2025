import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchHeader from './SearchHeader';

const categories = [
  {
    name: 'Foods Online',
    icon: { uri: 'https://i.ibb.co/NgVMr1nj/77bb32577e7acd895584a282f5e8be02e3c1214b.png' },
  },
  {
    name: 'Food Vendors',
    icon: { uri: 'https://i.ibb.co/NgVMr1nj/77bb32577e7acd895584a282f5e8be02e3c1214b.png' },
  },
  {
    name: 'Restaurants',
    icon: { uri: 'https://i.ibb.co/NgVMr1nj/77bb32577e7acd895584a282f5e8be02e3c1214b.png' },
  },
];

const products = [
  { id: '1', title: 'Feature Product Title', image:{ uri: 'https://i.ibb.co/gZQTsKfF/4442b060b2835595dfd326cb50923860eda1c924.png' }, price: 499 },
  { id: '3', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/j99mRp4W/orange.png' }, price: 499 },
  { id: '2', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/Q732DLQZ/ef3ef572d8a0de85149d2cd0404e0a328b720b40.png' }, price: 499 },
  { id: '4', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/M59MyNrC/ea32667442a7b68961cd12e8c41ff0f6c3ca3dbd.png' }, price: 499 },
  { id: '5', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/gZQTsKfF/4442b060b2835595dfd326cb50923860eda1c924.png' }, price: 499 },
  { id: '6', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/gZQTsKfF/4442b060b2835595dfd326cb50923860eda1c924.png' }, price: 499 },
  { id: '7', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/gZQTsKfF/4442b060b2835595dfd326cb50923860eda1c924.png' }, price: 499 },
  { id: '8', title: 'Feature Product Title', image: { uri: 'https://i.ibb.co/gZQTsKfF/4442b060b2835595dfd326cb50923860eda1c924.png' }, price: 499 },
];

const FoodListingScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Foods Online');

  const renderProduct = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity style={styles.cartButton}>
        <Ionicons name="cart" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
     <SearchHeader/>

      {/* Category Tabs */}
     <View style={styles.categoryTabs}>
  {categories.map((cat) => {
    const isActive = activeCategory === cat.name;
    return (
      <TouchableOpacity
        key={cat.name}
        onPress={() => setActiveCategory(cat.name)}
        style={[styles.categoryTab, isActive && styles.activeTab]}
      >
        <Image source={cat.icon} style={styles.categoryIcon} />
        <Text style={[styles.categoryText, isActive && styles.activeTabText]}>
          {cat.name}
        </Text>
        {isActive && <View style={styles.trianglePointer} />}
      </TouchableOpacity>
    );
  })}
</View>

      {/* Products Grid */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="pricetags" size={24} />
          <Text style={styles.navText}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart" size={24} />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default FoodListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  categoryTabs: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 10,
},
categoryTab: {
  alignItems: 'center',
  backgroundColor: '#eee',
  padding: 10,
  width: 100,
  borderRadius: 2,
  position: 'relative',
},
activeTab: {
  backgroundColor: '#f9ae53',
},
categoryIcon: {
  width: 24,
  height: 24,
  marginBottom: 6,
  resizeMode: 'contain',
  color: '#333',
},
categoryText: {
  fontSize: 12,
  color: '#333',
},
activeTabText: {
  color: '#fff',
  fontWeight: 'bold',
},
trianglePointer: {
  position: 'absolute',
  bottom: -8,
  left: '50%',
  marginLeft: -8,
  width: 0,
  height: 0,
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderTopWidth: 8,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#FFA645',
},
  productList: {
    paddingHorizontal: 10,
  },
  card: {
    width: '47%',
    backgroundColor: '#f9f9f9',
    margin: '1.5%',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  productTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  cartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
  },
});
