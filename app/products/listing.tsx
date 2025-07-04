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
import { Search, Filter, ChevronDown, ShoppingCart, Star, X } from 'lucide-react-native';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = (screenWidth - 60) / 2;

// Product data for men's shirts
const products = [
  {
    id: '1',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.5,
    reviews: 124,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Hoodie',
  },
  {
    id: '2',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Dress Shirt',
  },
  {
    id: '3',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Casual Shirt',
  },
  {
    id: '4',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Casual Shirt',
  },
  {
    id: '5',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.5,
    reviews: 342,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Formal Shirt',
  },
  {
    id: '6',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.8,
    reviews: 278,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Casual Shirt',
  },
  {
    id: '7',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.9,
    reviews: 95,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Denim Jacket',
  },
  {
    id: '8',
    title: 'Feature Product Title',
    price: '$499.00',
    rating: 4.4,
    reviews: 187,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    category: 'Formal Shirt',
  },
];

const filterOptions = ['All', 'Price', 'Sort By', 'Offers Available', 'Best Selling'];
const activeFilters = ['Men', 'Shirts'];

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(activeFilters);

  const removeFilter = (filter: string) => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.cartButton}>
          <ShoppingCart size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={12} color="#FFB800" fill="#FFB800" />
          <Star size={12} color="#FFB800" fill="#FFB800" />
          <Star size={12} color="#FFB800" fill="#FFB800" />
          <Star size={12} color="#FFB800" fill="#FFB800" />
          <Star size={12} color="#E5E7EB" fill="#E5E7EB" />
        </View>
        
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Options */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {filterOptions.map((filter, index) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  index === 0 && styles.allFilterButton,
                ]}
              >
                <Text style={[
                  styles.filterText,
                  index === 0 && styles.allFilterText,
                ]}>
                  {filter}
                </Text>
                {index > 0 && <ChevronDown size={16} color="#6B7280" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Active Filters */}
        <View style={styles.activeFiltersSection}>
          {selectedFilters.map((filter) => (
            <View key={filter} style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filter}</Text>
              <TouchableOpacity onPress={() => removeFilter(filter)}>
                <X size={14} color="#00BFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  content: {
    flex: 1,
  },
  filterSection: {
    paddingVertical: 16,
  },
  filterScroll: {
    paddingLeft: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  allFilterButton: {
    backgroundColor: '#1F2937',
    borderColor: '#1F2937',
  },
  filterText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 4,
  },
  allFilterText: {
    color: '#FFFFFF',
  },
  activeFiltersSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#00BFFF',
    marginRight: 6,
  },
  productsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: itemWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
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
    height: 180,
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
    padding: 8,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
});