import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import  SearchBar  from '../components/SearchHeader';
import  FilterBar  from '../components/FilterBar';
import { useRouter } from 'expo-router';
import {products} from "../constants/products";


const ProductGrid = () => {
  const router = useRouter();

  const renderItem = ({ item }: { item: { id: string; title: string; price: string; image: any } }) => (
    <TouchableOpacity
      style={styles.card}
      
onPress={() => router.push({
  pathname: '/products/[productId]',
   params: { productId: item.id, title: item.title, price: item.price },
})} 
    >
      <Image source={item.image} style={styles.image} />
      <TouchableOpacity style={styles.cartBtn}>
        <ShoppingCart size={16} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <FilterBar />
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductGrid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    width: '48%',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    position: 'relative',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  cartBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 6,
    zIndex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
