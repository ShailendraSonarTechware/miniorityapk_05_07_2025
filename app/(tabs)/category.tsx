import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { useNavigation } from '@react-navigation/native';
// 1. Define allowed section keys
type SectionKey = 'products' | 'services' | 'restaurants' | 'business';

// 2. Sidebar sections
// const sections: { key: SectionKey; label: string; icon: string }[] = [
//   { key: 'products', label: 'Products', icon: 'https://img.icons8.com/ios-filled/50/backpack.png' },
//   { key: 'services', label: 'Services', icon: 'https://img.icons8.com/ios/50/delivery-scooter.png' },
//   { key: 'restaurants', label: 'Restaurants', icon: 'https://img.icons8.com/ios/50/pizza.png' },
//   { key: 'business', label: 'Business', icon: 'https://img.icons8.com/ios/50/vegetarian-food.png' },
// ];
const sections: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'products', label: 'Products', icon: 'https://img.icons8.com/ios-filled/50/backpack.png' },
  { key: 'services', label: 'Services', icon: 'https://img.icons8.com/ios/50/delivery-scooter.png' },
  { key: 'restaurants', label: 'Restaurants', icon: 'https://img.icons8.com/ios/50/pizza.png' },
  { key: 'business', label: 'Business', icon: 'https://img.icons8.com/ios/50/vegetarian-food.png' },
];

// 3. Category data
const categories: Record<SectionKey, { name: string; icon: string }[]> = {
  products: [
    { name: 'Furnitures', icon: 'https://img.icons8.com/ios/50/sofa.png' },
    { name: 'Fashion', icon: 'https://img.icons8.com/ios/50/clothes.png' },
    { name: 'Health & Beauty', icon: 'https://img.icons8.com/ios/50/mirror.png' },
    { name: 'Books', icon: 'https://img.icons8.com/ios/50/book.png' },
    { name: 'Decor', icon: 'https://img.icons8.com/ios/50/ceiling-lamp.png' },
    { name: 'Kitchen Appliances', icon: 'https://img.icons8.com/ios/50/mixer.png' },
    { name: 'Sports and Fitness', icon: 'https://img.icons8.com/ios/50/basketball.png' },
    { name: 'Shoes', icon: 'https://img.icons8.com/ios/50/sneakers.png' },
    { name: 'Mobiles , Computers', icon: 'https://img.icons8.com/ios/50/laptop.png' },
    { name: 'TV, Appliances , Electronics', icon: 'https://img.icons8.com/ios/50/tv.png' },
    { name: 'Audio & Music Instruments', icon: 'https://img.icons8.com/ios/50/violin.png' },
    { name: 'Bags and Accessories', icon: 'https://img.icons8.com/ios/50/handbag-front-view.png' },
    { name: 'Car, Motorbike Industrial', icon: 'https://img.icons8.com/ios/50/car.png' },
    { name: 'Office Supplies', icon: 'https://img.icons8.com/ios/50/binder.png' },
    { name: 'Art Supplies', icon: 'https://img.icons8.com/ios/50/paint-palette.png' },
  ],
  services: [{ name: 'Decor', icon: 'https://img.icons8.com/ios/50/ceiling-lamp.png' },
    { name: 'Kitchen Appliances', icon: 'https://img.icons8.com/ios/50/mixer.png' },
    { name: 'Sports and Fitness', icon: 'https://img.icons8.com/ios/50/basketball.png' },
    { name: 'Shoes', icon: 'https://img.icons8.com/ios/50/sneakers.png' },],

  restaurants: [ { name: 'Car, Motorbike Industrial', icon: 'https://img.icons8.com/ios/50/car.png' },
    { name: 'Office Supplies', icon: 'https://img.icons8.com/ios/50/binder.png' },
    { name: 'Art Supplies', icon: 'https://img.icons8.com/ios/50/paint-palette.png' },],

  business: [
    { name: 'Kitchen Appliances', icon: 'https://img.icons8.com/ios/50/mixer.png' },
    { name: 'Sports and Fitness', icon: 'https://img.icons8.com/ios/50/basketball.png' },
  ],
};

export default function CategoryScreen() {
  const [activeSection, setActiveSection] = useState<SectionKey>('products');
const router = useRouter(); 


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.key}
              style={[
                styles.sidebarItem,
                activeSection === section.key && styles.activeSidebarItem,
              ]}
              onPress={() => setActiveSection(section.key)}
            >
              <Image source={{ uri: section.icon }} style={styles.sidebarIcon} />
              <Text
                style={[
                  styles.sidebarLabel,
                  activeSection === section.key && styles.activeLabel,
                ]}
              >
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>PRODUCT CATEGORIES</Text>
          <ScrollView>
            <View style={styles.grid}>
              {categories[activeSection]?.map((item, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => router.push('/components/ServiceCategory')} >
                  <Image source={{ uri: item.icon }} style={styles.cardIcon} />
                  <Text style={styles.cardText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
              {categories[activeSection]?.length === 0 && (
                <Text style={{ textAlign: 'center', marginTop: 50, color: 'gray' }}>
                  No categories available.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 100,
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
  },
  sidebarItem: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  activeSidebarItem: {
    backgroundColor: '#f5a45d',
  },
  sidebarIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  sidebarLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  activeLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    marginVertical: 10,
    alignItems: 'center',
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
  },
});
