import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import SearchHeader from '../components/SearchHeader';

const dummyProduct = {
  title: 'MEN REGULAR FIT PRINTED SPREAD COLLAR CASUAL SHIRT',
  price: '$289',
  originalPrice: '$1,663',
  discount: '82% OFF',
  rating: 4.2,
  ratingsCount: 160,
  reviewsCount: 5,
  colors: ['#7B3F00', '#00BCD4', '#FFC107'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
   image: { uri: 'https://i.ibb.co/yBd217BB/jacket.png' },
  details: {
    'Pack of': '4 (Special Pack)',
    'Style Code': 'MLYCRA_16_BEIGE',
    Closure: 'BUTTON',
    Fit: 'REGULAR',
    Fabric: 'LYCRA BLEND',
    Sleeve: 'HALF SLEEVE',
    Pattern: 'PRINTED',
    Reversible: 'NO',
    Collar: 'SPREAD',
    Color: 'BEIGE, PINK',
    'Wash Care': 'GENTLE MACHINE WASH',
    'Suitable For': 'WESTERN WEAR',
  },
};

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(dummyProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView style={styles.container}>
      {/* <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </Pressable> */}
      <SearchHeader/>

      <Image
        source={dummyProduct.image}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{dummyProduct.title}</Text>
      <View style={styles.ratingRow}>
        <FontAwesome name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>
          {dummyProduct.rating} | {dummyProduct.ratingsCount} Ratings &{' '}
          {dummyProduct.reviewsCount} Reviews
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{dummyProduct.price}</Text>
        <Text style={styles.originalPrice}>{dummyProduct.originalPrice}</Text>
        <Text style={styles.discount}>{dummyProduct.discount}</Text>
      </View>

      <Text style={styles.label}>Color:</Text>
      <View style={styles.colorRow}>
        {dummyProduct.colors.map((color, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedColor(color)}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              selectedColor === color
                ? styles.colorSelected
                : styles.colorUnselected,
            ]}
          />
        ))}
      </View>

      <Text style={styles.label}>Size Chart:</Text>
      <View style={styles.sizeRow}>
        {dummyProduct.sizes.map((size) => (
          <Pressable
            key={size}
            style={[
              styles.sizeBox,
              selectedSize === size
                ? styles.sizeSelected
                : styles.sizeUnselected,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={
                selectedSize === size
                  ? styles.sizeTextSelected
                  : styles.sizeText
              }
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

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
        <Pressable style={styles.cartButton}>
          <Text>Add To Cart</Text>
        </Pressable>
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Product Details</Text>
      <View style={styles.detailsContainer}>
        {Object.entries(dummyProduct.details).map(([key, val]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailKey}>{key}:</Text>
            <Text>{val}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        Add a stylish, laidback vibe to your wardrobe with this shirt. This
        breezy button-up brings the cool with its relaxed collar and breathable
        fabric. Wear it for casual days or layer it for a weekend vibe.
      </Text>

      <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
      <Text>
        ⭐️⭐️⭐️⭐️☆ — "Good product, fits well and the quality is nice."
      </Text>

      <Pressable style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>WRITE A REVIEW</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Similar Products</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.similarRow}
      >
        <Image source={dummyProduct.image} style={styles.similarImage} />
        <Image source={dummyProduct.image} style={styles.similarImage} />
        <Image source={dummyProduct.image} style={styles.similarImage} />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  backButton: { marginBottom: 12 },
  backText: { fontSize: 16, color: '#000' },
  image: { width: '100%', height: 300, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { marginLeft: 4 },
  priceRow: { flexDirection: 'row', marginTop: 8 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  originalPrice: {
    marginLeft: 10,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  discount: { marginLeft: 10, color: 'green' },
  label: { marginTop: 16, fontWeight: 'bold' },
  colorRow: { flexDirection: 'row', marginTop: 8, gap: 12 },
  colorBox: { width: 30, height: 30, borderRadius: 15 },
  colorSelected: { borderWidth: 2, borderColor: 'black' },
  colorUnselected: { borderWidth: 1, borderColor: 'grey' },
  sizeRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  sizeBox: { padding: 10 },
  sizeSelected: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#000',
  },
  sizeUnselected: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sizeText: { color: '#000' },
  sizeTextSelected: { color: '#fff' },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: { padding: 10, borderWidth: 1 },
  quantityText: { marginHorizontal: 16 },
  cartButton: {
    flex: 1,
    backgroundColor: '#f1c40f',
    padding: 12,
    alignItems: 'center',
    marginLeft: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  buyButtonText: { color: '#fff' },
  sectionTitle: { marginTop: 24, fontWeight: 'bold', fontSize: 16 },
  detailsContainer: { marginTop: 8 },
  detailRow: { flexDirection: 'row', marginBottom: 4 },
  detailKey: { fontWeight: 'bold', width: 150 },
  description: { marginTop: 8 },
  reviewButton: {
    marginTop: 16,
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  reviewButtonText: { color: 'red', fontWeight: 'bold' },
  similarRow: { marginTop: 8 },
  similarImage: { width: 120, height: 140, marginRight: 8 },
});
