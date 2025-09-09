import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getProductById } from "../../services/productService";
import { addItemToCart } from "../../services/cartApi";
import { useCart } from "../../contexts/CartContext";

type ProductSize = {
  sizeId: string;
  size: string;
  sku: string;
  stock: number;
  price: number;
  salePrice?: number | null;
  discountEndDate?: string | null;
};

type ProductVariant = {
  variantId: string;
  color: string;
  label: string;
  allowBackorder: boolean;
  images: string[];
  averageRating: number;
  totalReviews: number;
  sizes: ProductSize[];
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  brand: string;
  categoryId: string;
  subcategoryId: string;
  businessId: string;
  coverImage: string;
  specifications: { key: string; value: string; _id: string }[];
  isPublished: boolean;
  variants: ProductVariant[];
};

export default function ProductDetailScreen() {
    const { addToCart } = useCart();
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    if (!productId) return;

    getProductById(productId)
      .then((data: Product) => {
        if (data) {
          setProduct(data);
          if (data.variants?.length > 0) {
            setSelectedVariant(data.variants[0]);
            if (data.variants[0].sizes?.length > 0) {
              setSelectedSize(data.variants[0].sizes[0]);
            }
          }
        }
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading && !product) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const price = selectedSize?.price ?? 0;
  const salePrice = selectedSize?.salePrice ?? price;
  const discount =
    price && salePrice && price > salePrice
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;

  return (
    <ScrollView style={[styles.container, { backgroundColor: "#fff" }]}>




      {/* ✅ Product Image */}
      <Image
        source={{ uri: selectedVariant?.images?.[0] ?? product.coverImage }}
        style={styles.image}
        resizeMode="contain"
      />
      {/* ✅ Brand Name */}
      <Text style={styles.brand}>{product.brand}</Text>

      {/* ✅ Title */}
      <Text style={styles.title}>{product.title}</Text>

      {/* ✅ Ratings */}
      <View style={styles.ratingRow}>
        <FontAwesome name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>
          {selectedVariant?.averageRating ?? 0} |{" "}
          {selectedVariant?.totalReviews ?? 0} Reviews
        </Text>
      </View>

      {/* ✅ Price */}
      <View style={styles.priceRow}>
        <Text style={styles.salePrice}>${salePrice}</Text>
        {discount > 0 && (
          <>
            <Text style={styles.originalPrice}>${price}</Text>
            <Text style={styles.discount}>{discount}% OFF</Text>
          </>
        )}
      </View>

      {/* ✅ Colors */}
      <Text style={styles.label}>Colors:</Text>
      <View style={styles.colorRow}>
        {product.variants.map((variant) => (
          <Pressable
            key={variant.variantId}
            onPress={() => {
              setSelectedVariant(variant);
              if (variant.sizes?.length > 0) {
                setSelectedSize(variant.sizes[0]);
              }
            }}
            style={[
              styles.colorBox,
              { backgroundColor: variant.color },
              selectedVariant?.variantId === variant.variantId
                ? styles.colorSelected
                : styles.colorUnselected,
            ]}
          />
        ))}
      </View>

      {/* ✅ Sizes */}
      <Text style={styles.label}>Sizes:</Text>
      <View style={styles.sizeRow}>
        {selectedVariant?.sizes?.map((size) => (
          <Pressable
            key={size.sizeId}
            style={[
              styles.sizeBox,
              selectedSize?.sizeId === size.sizeId
                ? styles.sizeSelected
                : styles.sizeUnselected,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={
                selectedSize?.sizeId === size.sizeId
                  ? styles.sizeTextSelected
                  : styles.sizeText
              }
            >
              {size.size}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ✅ Quantity + Cart/Buy */}
      <Text style={styles.label}>Quantity:</Text>
      <View style={styles.quantityRow}>
        <Pressable
          onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          style={styles.quantityButton}
        >
          <Text>-</Text>
        </Pressable>
        <Text style={styles.quantityText}>{quantity}</Text>
        <Pressable
          onPress={() => setQuantity((q) => q + 1)}
          style={styles.quantityButton}
        >
          <Text>+</Text>
        </Pressable>
        <Pressable
          style={styles.cartButton}
          onPress={async () => {
            if (!selectedVariant || !selectedSize) {
              alert("Please select color and size before adding to cart");
              return;
            }
            console.log("Sending cart payload:", {
              productId: product._id,
              variantId: selectedVariant?.variantId,
              quantity,
              variant: selectedSize?.size,
            });

            try {
              await addToCart({
                productId: product._id,
                variantId: selectedVariant?.variantId,  // use variantId from API
                quantity,
                variant: selectedSize?.size,            // backend expects string size
              });

              alert("✅ Added to cart!");
              // router.push("../../(tabs)/cart"); // navigate after success
            } catch (err: any) {
              console.error(err);
              alert(err.response?.data?.message || "Failed to add to cart");
            }
          }}
        >
          <Text>Add To Cart</Text>
        </Pressable>
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Pressable>
      </View>

      {/* ✅ Specifications */}
      <Text style={styles.sectionTitle}>Product Details</Text>
      <View style={styles.detailsContainer}>
        {product.specifications.map((spec) => (
          <View key={spec._id} style={styles.detailRow}>
            <Text style={styles.detailKey}>{spec.key}:</Text>
            <Text>{spec.value}</Text>
          </View>
        ))}
      </View>

      {/* ✅ Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* ✅ Reviews */}
      <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
      <Text>
        ⭐️⭐️⭐️⭐️☆ — "This is where user reviews would appear..."
      </Text>
      <Pressable style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>WRITE A REVIEW</Text>
      </Pressable>

      {/* ✅ Similar Products */}
      <Text style={styles.sectionTitle}>Similar Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarRow}>
        {product.variants.flatMap((v, i) =>
          v.images.map((img, idx) => (
            <Image
              key={`${i}-${idx}`}
              source={{ uri: img }}
              style={styles.similarImage}
            />
          ))
        )}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 , backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 12 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 4 },
  priceRow: { flexDirection: "row", marginTop: 8 },
  salePrice: { fontSize: 20, fontWeight: "bold", color: "#000" },
  originalPrice: {
    marginLeft: 10,
    textDecorationLine: "line-through",
    color: "gray",
    fontSize: 16,
  },
  discount: { marginLeft: 10, color: "green", fontWeight: "bold" },
  label: { marginTop: 16, fontWeight: "bold" },
  colorRow: { flexDirection: "row", marginTop: 8, gap: 12 },
  colorBox: { width: 30, height: 30, borderRadius: 15 },
  colorSelected: { borderWidth: 2, borderColor: "black" },
  colorUnselected: { borderWidth: 1, borderColor: "grey" },
  sizeRow: { flexDirection: "row", gap: 8, marginTop: 8 },
  sizeBox: { padding: 10 },
  sizeSelected: { backgroundColor: "#000", borderWidth: 1, borderColor: "#000" },
  sizeUnselected: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" },
  sizeText: { color: "#000" },
  sizeTextSelected: { color: "#fff" },
  quantityRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },
  quantityButton: { padding: 10, borderWidth: 1 },
  quantityText: { marginHorizontal: 16 },
  cartButton: {
    flex: 1,
    backgroundColor: "#f1c40f",
    padding: 12,
    alignItems: "center",
    marginLeft: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  buyButtonText: { color: "#fff" },
  sectionTitle: { marginTop: 24, fontWeight: "bold", fontSize: 16 },
  detailsContainer: { marginTop: 8 },
  detailRow: { flexDirection: "row", marginBottom: 4 },
  detailKey: { fontWeight: "bold", width: 150 },
  description: { marginTop: 8 },
  reviewButton: {
    marginTop: 16,
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  reviewButtonText: { color: "red", fontWeight: "bold" },
  similarRow: { marginTop: 8 },
  similarImage: { width: 120, height: 140, marginRight: 8 },
  brand: { fontSize: 14, fontWeight: "600", color: "gray", marginTop: 8 },
});
