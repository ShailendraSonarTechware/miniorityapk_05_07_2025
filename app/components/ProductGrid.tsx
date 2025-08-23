import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Dimensions } from "react-native";
import { ShoppingCart, Star } from 'lucide-react-native';
import SearchBar from '../components/SearchHeader';
import FilterBar from '../components/FilterBar';
import { useRouter } from 'expo-router';
import { getProducts } from '../../services/productService';

const ProductGrid = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(1, 10);
        setProducts(data);
        console.log("all product data", data);
      } catch (error) {
        console.error('Error loading products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // ⭐ render stars based on average rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          color={i <= rating ? '#FFD700' : '#D3D3D3'} // gold if filled, gray otherwise
          fill={i <= rating ? '#FFD700' : 'none'}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item }: { item: any }) => {
    const avgRating = item?.variants?.[0]?.averageRating ?? 0;
    const reviewCount = item?.variants?.[0]?.totalReviews ?? 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: '/products/[productId]',
            params: {
              productId: item._id,
              title: item.title,
              price:
                item?.variants?.[0]?.sizes?.[0]?.salePrice ??
                item?.variants?.[0]?.sizes?.[0]?.price,
            },
          })
        }
      >
        <Image source={{ uri: item.coverImage }} style={styles.image} />
        <TouchableOpacity style={styles.cartBtn}>
          <ShoppingCart size={16} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.ratingRow}>
          {renderStars(avgRating)}
          <Text style={styles.reviewText}>({reviewCount})</Text>
        </View>

        <Text style={styles.priceRow}>
  {item?.variants?.[0]?.sizes?.[0]?.salePrice &&
   item?.variants?.[0]?.sizes?.[0]?.salePrice < item?.variants?.[0]?.sizes?.[0]?.price ? (
    <>
      <Text style={styles.oldPrice}>
        ${item?.variants?.[0]?.sizes?.[0]?.price}
      </Text>
      <Text style={styles.salePrice}>
        ${item?.variants?.[0]?.sizes?.[0]?.salePrice}
      </Text>
    </>
  ) : (
    <Text style={styles.salePrice}>
      ${item?.variants?.[0]?.sizes?.[0]?.price ?? 'N/A'}
    </Text>
  )}
</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    // <SafeAreaView style={styles.container}>
    <>
      <SearchBar />
      <FilterBar />
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 100, minHeight: height }}
        showsVerticalScrollIndicator={false}
      />
      </>
    // </SafeAreaView>
  );
};

export default ProductGrid;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  priceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 2,
},
oldPrice: {
  fontSize: 13,
  color: 'red',
  textDecorationLine: 'line-through',
  marginRight: 6,
},
salePrice: {
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
},

});
