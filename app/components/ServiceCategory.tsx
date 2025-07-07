import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { ChevronLeft, Search, Heart, Star, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
const services = [
  {
    id: 1,
    name: 'ORCHID BEAUTY SPA',
    category: 'SKIN & BEAUTY',
    type: 'Skin Treatment',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Book Now',
  },
  {
    id: 2,
    name: 'LOREM IPSUM',
    category: 'SKIN & BEAUTY',
    type: 'International Tour',
    image: 'https://images.pexels.com/photos/3865612/pexels-photo-3865612.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Solo Trip',
  },
  {
    id: 3,
    name: 'LOREM IPSUM',
    category: 'SKIN & BEAUTY',
    type: 'International Tour',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Solo Trip',
  },
  {
    id: 4,
    name: 'LOREM IPSUM',
    category: 'SKIN & BEAUTY',
    type: 'International Tour',
    image: 'https://images.pexels.com/photos/3738332/pexels-photo-3738332.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Solo Trip',
  },
  {
    id: 5,
    name: 'LOREM IPSUM',
    category: 'SKIN & BEAUTY',
    type: 'International Tour',
    image: 'https://images.pexels.com/photos/3985368/pexels-photo-3985368.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Solo Trip',
  },
  {
    id: 6,
    name: 'LOREM IPSUM',
    category: 'SKIN & BEAUTY',
    type: 'International Tour',
    image: 'https://images.pexels.com/photos/3865612/pexels-photo-3865612.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    reviews: 94,
    location: 'Lorem Ipsum Dolor Sit',
    badge: 'Solo Trip',
  },
];


const vendors = [
  {  name: 'Raymond',  logo: { uri: 'https://i.ibb.co/Y4YXyZ2B/raymond.png' } },
  { name: 'PUMA',  logo: { uri: 'https://i.ibb.co/JRCHPSfs/puma.png' } },
  {  name: 'Pepe Jeans', logo: { uri: 'https://i.ibb.co/DHZZGnpH/pepe.png' }},
  { name: 'FILA', logo:{ uri: 'https://i.ibb.co/hF4q5mZM/fila.png' } },
  { name: 'Reebok',logo: { uri: 'https://i.ibb.co/Q3Fj1PZb/reebok.png' } },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filters = ['All', 'Price', 'Sort By', 'Offers Available', 'Best'];
  const activeFilters = ['Skin Treatment', 'Spa Care'];

  const renderServiceCard = (service: any) => (
    <View key={service.id} style={styles.serviceCard}>
      <Image source={{ uri: service.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.categoryText}>{service.category}</Text>
          <TouchableOpacity style={styles.heartIcon}>
            <Heart size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceType}>{service.type}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color="#999" />
          <Text style={styles.locationText}>{service.location}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewText}>({service.reviews})</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>{service.badge}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search treatments..."
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>SKIN & BEAUTY TREATMENT</Text>
          <Text style={styles.mainTitle}>TOP TREATMENT SERVICES NEAR SAN FRANCISCO, CALIFORNIA</Text>
        </View>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === filter && styles.activeFilterButtonText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Active Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activeFiltersContainer}>
          {activeFilters.map((filter) => (
            <View key={filter} style={styles.activeFilterChip}>
              <Text style={styles.activeFilterText}>{filter}</Text>
              <TouchableOpacity style={styles.removeFilter}>
                <Text style={styles.removeFilterText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Services List */}
        <View style={styles.servicesContainer}>
          {services.map(renderServiceCard)}
        </View>

        {/* Vendors Section */}
        <View style={styles.vendorsSection}>
          <Text style={styles.vendorsTitle}>OUR VALUABLE VENDORS</Text>
          <View style={styles.vendorsGrid}>
            {vendors.map((vendor, index) => (
              <View key={index} style={styles.vendorCard}>
                <Image source={vendor.logo } style={styles.vendorLogo} />
                <Text style={styles.vendorName}>{vendor.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.testimonialsSection}>
          <Text style={styles.testimonialsTitle}>WHAT OUR CLIENTS SAY</Text>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do. Et Dolore Magna Aliqua. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do.
            </Text>
            <View style={styles.testimonialFooter}>
              <View style={styles.testimonialAuthor}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100' }} 
                  style={styles.authorAvatar} 
                />
                <View>
                  <Text style={styles.authorName}>John Doe</Text>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} color="#FFD700" fill="#FFD700" />
                    ))}
                  </View>
                </View>
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    lineHeight: 24,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: '#FF8C00',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  activeFiltersContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  activeFilterText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  removeFilter: {
    marginLeft: 8,
  },
  removeFilterText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#00BCD4',
    fontWeight: '600',
  },
  heartIcon: {
    padding: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: '#00BCD4',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  vendorsSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  vendorsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  vendorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vendorCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  vendorLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 10,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  testimonialsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  testimonialsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  testimonialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
});