// App.js
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const categories = [
  { id: '1', name: 'Furnitures', icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-furniture-interior-design-flatart-icons-outline-flatarticons.png' },
  { id: '2', name: 'Fashion', icon: 'https://img.icons8.com/color/96/fashion.png' },
  { id: '3', name: 'Health & ..', icon: 'https://img.icons8.com/ios-filled/50/makeup.png' },
  { id: '4', name: 'Books', icon: 'https://img.icons8.com/ios-filled/50/book.png' },
  { id: '5', name: 'Decor', icon: 'https://img.icons8.com/ios/50/ceiling-lamp.png' },
  { id: '6', name: 'Kitchen', icon: 'https://img.icons8.com/ios-filled/50/kitchen-room.png' },
];

const serviceFilters = ['All', 'Home Care', 'Fashion', 'Skin & Beauty', 'Tour & Travel', 'Gardening', 'Construction'];

const products = [
  { id: '1', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/yBd217BB/jacket.png' } },
  { id: '2', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/cKKPFVnk/sofa.png' } },
  { id: '3', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/MxBg9HBc/pot.png' }},
];

const restaurant = [
  { id: '1', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/TMMfVRCs/resone.jpg' } },
  { id: '2', title: 'Feature Product Title', price: '$499.00', image:{ uri: 'https://i.ibb.co/SwCyRWTb/restwo.jpg '}},
  { id: '3', title: 'Feature Product Title', price: '$499.00', image: { uri: 'https://i.ibb.co/hR7KyzsP/resthree.jpg' }},
  { id: '4', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/N8vGmbD/resfour.jpg' }},
];
const food_products = [
  { id: '1', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/ycVgmbKm/coconut.png' } },
  { id: '2', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/j99mRp4W/orange.png' } },
  { id: '3', title: 'Feature Product Title', price: '$499.00',  image: { uri: 'https://i.ibb.co/21J0jVGJ/beatroot.png' }},
];

const services = [
  { id: '1', name: 'MAGNA TOURISM', tag: 'Solo Trip', category: 'TOUR & TRAVEL', image: { uri: 'https://i.ibb.co/FbS60sNR/magna.jpg' }},
  { id: '2', name: 'ORCHID BEAUTY SPA', tag: 'Spa Care', category: 'SKIN & BEAUTY', image: { uri: 'https://i.ibb.co/xqjbFh4z/cleaner.jpg' }  },
  { id: '2', name: 'ORCHID BEAUTY SPA', tag: 'Spa Care', category: 'SKIN & BEAUTY', image: { uri: 'https://i.ibb.co/X1qB42g/plantation.jpg' }  },
];

const vendors = [
  { id: '1', logo: { uri: 'https://i.ibb.co/Y4YXyZ2B/raymond.png' } },
  { id: '2', logo: { uri: 'https://i.ibb.co/JRCHPSfs/puma.png' } },
  { id: '3', logo: { uri: 'https://i.ibb.co/DHZZGnpH/pepe.png' }},
  { id: '4', logo: { uri: 'https://i.ibb.co/hF4q5mZM/fila.png' } },
  { id: '5', logo: { uri: 'https://i.ibb.co/Q3Fj1PZb/reebok.png' } },
];


export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Image source={{ uri: 'https://i.ibb.co/ZRK1fCQf/onboardimage.png' }}style={styles.logo} />
        <TextInput style={styles.search} placeholder="Search Products, Services, etc." />

        <Image source={{ uri: 'https://i.ibb.co/NgqqGZnr/Banner.png' }}  style={styles.banner} />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
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
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => router.push('/products')}
            >
              <Image source={item.image} style={styles.image} />
              <Text>{item.title}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.sectionTitle}>BOOK YOUR SERVICE</Text>
        <FlatList
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
        />

        {services.map(service => (
          <View key={service.id} style={styles.cardHorizontal}>
            <Image source={ service.image } style={styles.image} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{service.name}</Text>
              <Text>{service.category}</Text>
              <Text>{service.tag}</Text>
            </View>
          </View>
        ))}

        <Image source={{ uri: 'https://i.ibb.co/zVwK4P8Z/beauty-salon-banner.jpg' }} style={styles.banner} />

        <Text style={styles.sectionTitle}>FOOD PRODUCTS</Text>
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
      source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image URL
      style={styles.blogImage}
    />
    <View style={styles.blogContent}>
      <View style={styles.blogMeta}>
        <Text style={styles.blogDate}>📅 14th April, 2025</Text>
        <Text style={styles.blogCategory}> | Design</Text>
      </View>
      <Text style={styles.blogTitle}>
        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ELIT ...
      </Text>
      <View style={styles.blogFooter}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }} // Profile Image
          style={styles.authorImage}
        />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>JOHN DOE</Text>
          <Text style={styles.blogDetails}>2 Days Ago • 5 Min Read</Text>
        </View>
        <Text style={styles.bookmark}>🔖</Text>
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
  search: {
    margin: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  logo: {
    width: 200,
    height: 91,
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
    fontSize: 14,
    color: '#E07B39',
    fontWeight: '600',
    marginRight: 10,
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
  },
  vendorLogo: {
    width: 80,
    height: 40,
    resizeMode: 'contain',
  },
   blogCardLast: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 8,
    // borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff', // White background
  },
  blogImage: {
    width: 130,
    height: '100%',
  },
  blogContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogDate: {
    color: '#000', // Black text
    fontSize: 12,
  },
  blogCategory: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blogTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  blogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: '#00CFFF', // Highlighted color
    fontWeight: 'bold',
  },
  blogDetails: {
    color: '#555', // Dark grey for subtler text
    fontSize: 12,
  },
  bookmark: {
    fontSize: 18,
    color: 'orange',
  },
  
});