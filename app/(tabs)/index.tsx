// App.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, FlatList ,  ActivityIndicator,} from 'react-native';
import { Menu } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { getCategories } from "../../services/serviceService"
import ProductPreview from '../components/ProductPreviewShort';
import ServicePreview from '../components/ServicePreviewShort';
import { getServiceCategories } from "../../services/categoryApi"; // ✅ renamed
type Category = {
  _id: string;
  name: string;
  slug: string;
  img?: string;
};


const serviceFilters = ['All', 'Home Care', 'Fashion', 'Skin & Beauty', 'Tour & Travel', 'Gardening', 'Construction'];



const restaurant = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/TMMfVRCs/resone.jpg' } },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/SwCyRWTb/restwo.jpg ' } },
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/hR7KyzsP/resthree.jpg' } },
  { id: '4', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/N8vGmbD/resfour.jpg' } },
];
const food_products = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/ycVgmbKm/coconut.png' } },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/j99mRp4W/orange.png' } },
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/21J0jVGJ/beatroot.png' } },
];

const vendors = [
  { id: '1', logo: { uri: 'https://i.ibb.co/Y4YXyZ2B/raymond.png' } },
  { id: '2', logo: { uri: 'https://i.ibb.co/JRCHPSfs/puma.png' } },
  { id: '3', logo: { uri: 'https://i.ibb.co/DHZZGnpH/pepe.png' } },
  { id: '4', logo: { uri: 'https://i.ibb.co/hF4q5mZM/fila.png' } },
  { id: '5', logo: { uri: 'https://i.ibb.co/Q3Fj1PZb/reebok.png' } },
];


export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [categories, setCategories] = useState<Category[]>([]);
    const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories(); // from categoryService
        setCategories(res.data); // ✅ use res.data.data if your service returns whole object
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const data = await getServiceCategories();
        setServiceCategories(data);
      } catch (error) {
        console.error("Error fetching service categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCategories();
  }, []);


if (loading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.ibb.co/0ytxPkCH/onboardimage-removebg-preview.png' }}
            style={styles.logo}
          />
          <TouchableOpacity onPress={() => console.log('Hamburger pressed')} style={{ paddingRight: 10 }}>
            <Menu size={28} color="#000" />
          </TouchableOpacity>
        </View>


        <TextInput style={styles.search} placeholder="Search Products, Services, etc." />

        <Image source={{ uri: 'https://i.ibb.co/NgqqGZnr/Banner.png' }} style={styles.banner} />

        {/* ------------------------------------- */}
        {/* this is service category list  */}
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}  // ✅ every item has _id
          horizontal
          style={styles.categoryList}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Image
                source={{ uri: item.img || "https://via.placeholder.com/60" }} // ✅ fallback image
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SHOP ALL PRODUCTS</Text>
          <TouchableOpacity onPress={() => router.push('../../components/ProductGrid')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {/* ------------------------------------- */}



        {/* ------------------------------------- */}
        {/* small preview of product in home page  */}
        <ProductPreview />
        {/* ------------------------------------- */}



       
         <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BOOK YOUR SERVICE</Text>
          <TouchableOpacity onPress={() => router.push('../../components/ServiceCategory')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {/* <FlatList
          horizontal
          data={serviceFilters}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 10, marginVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedFilter(item)}
              style={[
                styles.filterButton,
                selectedFilter === item && styles.filterButtonSelected,
              ]}
            >
              <Text
                style={{
                  color: selectedFilter === item ? '#fff' : '#333',
                  fontWeight: '500',
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        /> */}
        <FlatList
      horizontal
      data={serviceCategories}
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator={false}
      style={{ paddingHorizontal: 10, marginVertical: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelectedCategorySlug(item.slug)}
          style={[
            styles.categoryButton,
            selectedCategorySlug === item.slug && styles.categoryButtonSelected,
          ]}
        >
          <Text
            style={{
              color: selectedCategorySlug === item.slug ? "#fff" : "#333",
              fontWeight: "500",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />



        {/* ------------------------------------- */}
        {/* Small preview of Services in home page limit 3 */}
        <ServicePreview/>
        {/* ------------------------------------- */}


        <Image source={{ uri: 'https://i.ibb.co/zVwK4P8Z/beauty-salon-banner.jpg' }} style={styles.banner} />



        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FOOD PRODUCTS</Text>
          <TouchableOpacity onPress={() => router.push('/food-listing')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={food_products}
          keyExtractor={item => item.id + '-food'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>OUR VALUABLE VENDORS</Text>
        <FlatList
          horizontal
          data={vendors}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.vendorCard}>
              <Image source={item.logo} style={styles.vendorLogo} />
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
        <Image source={{ uri: 'https://i.ibb.co/LX9XGMNj/middle-banner.png' }} style={styles.banner} />

        <Text style={styles.sectionTitle}>ALL RESTAURANTS</Text>
        <FlatList
          horizontal
          data={restaurant}
          keyExtractor={item => item.id + '-rest'}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text>Restaurant {item.id}</Text>
              <Text>4.1 (5k)</Text>
            </View>
          )}
        />
        <Image source={{ uri: 'https://i.ibb.co/9mrbhCst/banner-food.jpg' }} style={styles.banner} />
        <Text style={styles.sectionTitle}>READING LIST</Text>

        {[1, 2, 3].map(id => (
          <View key={id} style={styles.blogCardLast}>
            <Image
              source={{ uri: 'https://i.ibb.co/v4v0PBNh/900849e5dc665c8f2363c0dc678c6962b77a5069.jpg' }} // Update with actual image URL
              style={styles.blogImage}
            />
            <View style={styles.blogContent}>
              <View style={styles.blogMeta}>
                <Text style={styles.blogDate}>14TH APRIL, 2025</Text>
                <Text style={styles.blogCategory}>  |  DESIGN</Text>
              </View>

              <Text style={styles.blogTitle}>
                LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ELIT ...
              </Text>

              <View style={styles.blogFooter}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/40' }}
                  style={styles.authorImage}
                />
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>JOHN DOE</Text>
                  <Text style={styles.blogDetails}>2 Days Ago • 5 Min Read</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.bookmark}>🔖</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}



        <TouchableOpacity onPress={() => AsyncStorage.removeItem('onboardingCompleted')}>
          <Text style={styles.resetText}>Reset Onboarding</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // backgroundColor: '#fff', 
  },
  search: {
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  logo: {
    width: 200,
    height: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categoryList: {
    marginVertical: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginHorizontal: 10,
  },
  viewAllText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    // marginRight: 2,
    marginTop: 15,  
    backgroundColor:'#16a1c0',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:20
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#000',
  },
  card: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
  },
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 0,
  },
  blogCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  resetText: {
    textAlign: 'center',
    marginVertical: 20,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  vendorCard: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  vendorLogo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
  blogCardLast: {
    flexDirection: 'row',
    backgroundColor: '#fff', // white background
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 6,
    overflow: 'hidden',
  },
  blogImage: {
    width: 140,
    height: 130,
    resizeMode: 'cover',
  },
  blogContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  blogMeta: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  blogDate: {
    fontSize: 12,
    color: '#333',
  },
  blogCategory: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginLeft: 4,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  blogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  authorName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00ADEF',
  },
  blogDetails: {
    fontSize: 11,
    color: '#777',
  },
  bookmark: {
    fontSize: 16,
    color: '#FFA500',
  },
  authorInfo: {
    flex: 1,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  categoryButtonSelected: {
    // backgroundColor: "#FF8C00",
    // borderColor: "#FF8C00",
    backgroundColor: "#000",
    borderColor: "#000",
  },

});