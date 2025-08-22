import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getProducts } from "../../services/productService";

const ProductPreview = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(1, 10);
        setProducts(data.slice(0, 3)); // 👈 only first 3 products
      } catch (error) {
        console.error("Error loading products", error);
      }
    };
    loadProducts();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const price = item?.variants?.[0]?.sizes?.[0]?.price ?? 0;
    const salePrice = item?.variants?.[0]?.sizes?.[0]?.salePrice ?? null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: "/products/[productId]",
            params: { productId: item._id },
          })
        }
      >
        <Image source={{ uri: item.coverImage }} style={styles.image} />

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          {salePrice && salePrice < price ? (
            <>
              <Text style={styles.oldPrice}>${price}</Text>
              <Text style={styles.salePrice}>${salePrice}</Text>
            </>
          ) : (
            <Text style={styles.salePrice}>${price}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    />
  );
};

export default ProductPreview;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginRight: 12,
    padding: 8,
    width: 140,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: "red",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
