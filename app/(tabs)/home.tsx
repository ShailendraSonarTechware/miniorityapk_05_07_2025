import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { Search, ShoppingCart, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Category data
const categories = [
  { id: '1', name: 'Men', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { id: '2', name: 'Women', image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { id: '3', name: 'Kids', image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { id: '4', name: 'Accessories', image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { id: '5', name: 'Footwear', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
];

// Best selling products
const bestSellingProducts = [
  {
    id: '1',
    title: 'Feature Product Title',
    price: '$499.00',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  },
  {
    id: '2',
    title: 'Feature Product Title',
    price: '$499.00',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  },
  {
    id: '3',
    title: 'Feature Product Title',
    price: '$499.00',
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
  },
];

// Vendor logos
const vendors = [
  { id: '1', name: 'Puma', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '2', name: 'Pepe Jeans', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '3', name: 'Fila', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '4', name: 'Raymond', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '5', name: 'Reebok', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '6', name: 'Ray-Ban', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '7', name: 'Allen Solly', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '8', name: 'Peter England', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
  { id: '9', name: 'U.S. Polo Assn.', logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=75&dpr=2' },
];

export default function HomeTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: typeof bestSellingProducts[0] }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderVendor = ({ item }: { item: typeof vendors[0] }) => (
    <View style={styles.vendorCard}>
      <Image source={{ uri: item.logo }} style={styles.vendorLogo} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Search */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.searchContainer}>
            <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search By Products, Services, Category, Location Etc..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Sale Banner */}
        <View style={styles.saleBanner}>
          <View style={styles.saleContent}>
            <Text style={styles.saleTitle}>BIG SALE</Text>
            <Text style={styles.saleDiscount}>60% OFF</Text>
            <Text style={styles.saleDescription}>Offer valid for limited time only</Text>
          </View>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2' }} 
            style={styles.saleImage} 
          />
        </View>

        {/* Best Selling Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BEST SELLING PRODUCTS</Text>
          <FlatList
            data={bestSellingProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Vendors Section */}
        <View style={styles.vendorsSection}>
          <Text style={styles.vendorsSectionTitle}>OUR VALUABLE VENDORS</Text>
          <View style={styles.vendorsGrid}>
            {vendors.map((vendor, index) => (
              <View key={vendor.id} style={styles.vendorCard}>
                <Image source={{ uri: vendor.logo }} style={styles.vendorLogo} />
              </View>
            ))}
          </View>
        </View>

        {/* Another Best Selling Products Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BEST SELLING PRODUCTS</Text>
          <FlatList
            data={bestSellingProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => `${item.id}-2`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Testimonial Section */}
        <View style={styles.testimonialSection}>
          <Text style={styles.testimonialTitle}>WHAT OUR CLIENTS SAY</Text>
          <View style={styles.testimonialCard}>
            <Text style={styles.quoteIcon}>"</Text>
            <Text style={styles.testimonialText}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do. Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do.
            </Text>
            <View style={styles.testimonialAuthor}>
              <Text style={styles.authorName}>John Doe</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} color="#FFB800" fill="#FFB800" />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  backArrow: {
    fontSize: 20,
    color: '#1F2937',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  categoriesSection: {
    paddingVertical: 20,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  saleBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFB800',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  saleContent: {
    flex: 1,
  },
  saleTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  saleDiscount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8,
  },
  saleDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  saleImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  productsList: {
    paddingHorizontal: 16,
  },
  productCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  cartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 6,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  vendorsSection: {
    backgroundColor: '#1F2937',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  vendorsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  vendorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vendorCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  vendorLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  testimonialSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  testimonialTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  testimonialCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
  },
  quoteIcon: {
    fontSize: 48,
    color: '#FFB800',
    fontWeight: '700',
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  testimonialAuthor: {
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00BFFF',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});