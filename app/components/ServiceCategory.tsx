import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { ChevronLeft, Search, Heart, Star, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import { getServices } from "../../services/serviceApi"; // ✅ use API service

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Price', 'Sort By', 'Offers Available', 'Best'];
  const activeFilters = ['Skin Treatment', 'Spa Care'];

  // Fetch API services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await getServices();
        if (json.success && json.data) {
          const mappedServices = json.data.map((item: any) => ({
            id: item._id,
            name: item.title,
            category: "SKIN & BEAUTY",
            type:
              item.services?.map((s: any) => s.name).join(", ") ||
              "General Service",
            image: item.coverImage,
            rating: item.averageRating || 0,
            reviews: item.totalReviews || 0,
            location: item.contact?.address || "Not Available",
            badge: "Book Now",
          }));
          setServices(mappedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter services by search text
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
          <Text style={styles.mainTitle}>
            TOP TREATMENT SERVICES NEAR SAN FRANCISCO, CALIFORNIA
          </Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter && styles.activeFilterButtonText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Active Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.activeFiltersContainer}
        >
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
          {loading ? (
            <ActivityIndicator size="large" color="#FF8C00" />
          ) : filteredServices.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>
              No services found
            </Text>
          ) : (
            filteredServices.map((service, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => router.push('./ServiceDetail')}
              >
                {renderServiceCard(service)}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { marginRight: 15 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
  titleSection: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00BCD4',
    marginBottom: 8,
  },
  mainTitle: { fontSize: 18, fontWeight: '700', color: '#333', lineHeight: 24 },
  filterContainer: { paddingHorizontal: 20, marginBottom: 15 },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  activeFilterButton: { backgroundColor: '#FF8C00' },
  filterButtonText: { fontSize: 14, color: '#666', fontWeight: '500' },
  activeFilterButtonText: { color: '#fff' },
  activeFiltersContainer: { paddingHorizontal: 20, marginBottom: 20 },
  activeFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  activeFilterText: { fontSize: 12, color: '#1976D2', fontWeight: '500' },
  removeFilter: { marginLeft: 8 },
  removeFilterText: { fontSize: 16, color: '#1976D2', fontWeight: '600' },
  servicesContainer: { paddingHorizontal: 20 },
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
  serviceContent: { padding: 16 },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: { fontSize: 12, color: '#00BCD4', fontWeight: '600' },
  heartIcon: { padding: 4 },
  serviceName: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  serviceType: { fontSize: 14, color: '#00BCD4', marginBottom: 8 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  locationText: { fontSize: 12, color: '#999', marginLeft: 4 },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingText: { fontSize: 14, fontWeight: '600', color: '#333', marginLeft: 4 },
  reviewText: { fontSize: 12, color: '#999', marginLeft: 4 },
  bookButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
