import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  Heart, Star, Edit3, Share2, Copy, Phone, MapPin, Globe, Check, Plus, Minus
} from 'lucide-react-native';
import SearchHeader from './SearchHeader';
import BookingModal from './BookingModal';
import { getServiceById } from '../../services/servicesApi'; // <- your API call

const { width } = Dimensions.get('window');


interface ServiceDetailProps {
  slug: string;
}

export default function ServiceDetail({ slug }: ServiceDetailProps) {
  // const { slug } = route.params;
  const [service, setService] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookingVisible, setBookingVisible] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await getServiceById(slug);

        console.log("API Response 👉", JSON.stringify(data, null, 2));

        setService(data?.service);
        setReviews(data?.reviews || []);
      } catch (err) {
        console.error("Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);


  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        color={index < rating ? '#FFD700' : '#E5E7EB'}
        fill={index < rating ? '#FFD700' : '#E5E7EB'}
      />
    ));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF7A00" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Service not found</Text>
      </SafeAreaView>
    );
  }

  // API Driven Data
  const images = [service.coverImage, ...(service.images || [])];
  const businessHours = service.businessHours || [];
  const amenities = service.amenities || [];
  const faqItems = service.faq || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.SearchHeader}>
          <SearchHeader />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>{/* back button */}</TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              size={24}
              color={isFavorite ? '#FF7A00' : '#9CA3AF'}
              fill={isFavorite ? '#FF7A00' : 'none'}
            />
          </TouchableOpacity>
        </View>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: images[selectedImageIndex] }} style={styles.mainImage} />
        </View>

        {/* Book Now */}
        <View>
          <TouchableOpacity style={styles.bookButton} onPress={() => setBookingVisible(true)}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
          <BookingModal visible={isBookingVisible} onClose={() => setBookingVisible(false)} />
        </View>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.categoryText}>
            {service?.categories?.map((c: any) => c.categoryId?.name).join(', ')}
          </Text>
          <Text style={styles.serviceTitle}>{service?.title}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingRow}>
              {renderStars(service?.averageRating || 0)}
              <Text style={styles.ratingText}>{service?.averageRating?.toFixed(1) || 0}</Text>
            </View>
            <Text style={styles.reviewCount}>
              {service?.totalReviews} RATINGS AND {reviews.length} REVIEWS
            </Text>
          </View>

          <Text style={styles.description}>{service?.description}</Text>


          {/* ✅ Features Section */}
          {service.features && service.features.length > 0 && (
            <View style={styles.featureContainer}>
              <Text style={styles.sectionTitle}>Features</Text>
              <FlatList
                data={service.features}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.featureItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.featureText}>{item}</Text>
                  </View>
                )}
              />
            </View>
          )}


          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit3 size={20} color="#16a1c0" />
              <Text style={styles.actionButtonText}>Add Review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color="#16a1c0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={20} color="#16a1c0" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color="#16a1c0" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PHOTO GALLERY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.galleryItem,
                  selectedImageIndex === index && styles.selectedGalleryItem,
                ]}
              >
                <Image source={{ uri: image }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Location + Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOCATIONS AND HOURS</Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapPlaceholder}>Map View</Text>
          </View>
          <View style={styles.hoursContainer}>
            {businessHours.map((hour: any, index: number) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.dayText}>{hour.day}</Text>
                <Text
                  style={[
                    styles.timeText,
                    hour.hours === 'Closed' && styles.closedText,
                  ]}
                >
                  {hour.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONTACT US</Text>
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <Phone size={20} color="#FF7A00" />
              <Text style={styles.contactText}>{service?.contact?.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#FF7A00" />
              <Text style={styles.contactText}>{service?.contact?.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#FF7A00" />
              <Text style={styles.contactText}>{service?.contact?.address}</Text>
            </View>
            <View style={styles.contactItem}>
              <Globe size={20} color="#FF7A00" />
              <Text style={styles.contactText}>{service?.contact?.website}</Text>
            </View>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AMENITIES</Text>
          <View style={styles.amenitiesContainer}>
            {amenities.map((a: any) => (
              <View key={a._id} style={styles.amenityItem}>
                <Check size={16} color={a.available ? '#10B981' : '#9CA3AF'} />
                <Text style={styles.amenityText}>{a.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          {faqItems.map((item: any) => (
            <View key={item._id} style={styles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleFAQ(item._id)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqQuestionText}>{item.question}</Text>
                {expandedFAQ === item._id ? (
                  <Minus size={20} color="#FF7A00" />
                ) : (
                  <Plus size={20} color="#FF7A00" />
                )}
              </TouchableOpacity>
              {expandedFAQ === item._id && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>RATINGS AND REVIEWS</Text>
            <View style={styles.overallRating}>
              <Text style={styles.overallRatingText}>{service?.averageRating?.toFixed(1) || 0}</Text>
              <Text style={styles.overallRatingSubtext}>
                {service?.totalReviews} RATINGS AND {reviews.length} REVIEWS
              </Text>
            </View>
          </View>
          {reviews.map((review: any) => (
            <View key={review._id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar || "https://via.placeholder.com/100" }} style={styles.reviewAvatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Get Direction</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton}>
            <Phone size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  SearchHeader: { paddingTop: 10, paddingBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 },
  favoriteButton: { width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, justifyContent: 'center', alignItems: 'center', position: 'relative', top: 40 },
  imageContainer: { width: '100%', height: 300 },
  mainImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  bookButton: { backgroundColor: '#000', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 2, alignSelf: 'center', marginTop: -25, zIndex: 2 },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  serviceInfo: { padding: 16 },
  categoryText: { fontSize: 12, color: '#16a1c0', fontWeight: 'bold', marginBottom: 8 },
  serviceTitle: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  ratingContainer: { marginBottom: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingText: { fontSize: 16, fontWeight: 'bold', color: '#000', marginLeft: 8 },
  reviewCount: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  description: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 16 },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionButtonText: { fontSize: 14, color: '#16a1c0', fontWeight: '600' },
  section: { paddingHorizontal: 16, paddingVertical: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  galleryContainer: { flexDirection: 'row' },
  galleryItem: { marginRight: 12 },
  selectedGalleryItem: { borderWidth: 2, borderColor: '#FF7A00' },
  galleryImage: { width: 80, height: 80, resizeMode: 'cover' },
  mapContainer: { height: 200, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  mapPlaceholder: { fontSize: 16, color: '#6B7280' },
  hoursContainer: { backgroundColor: '#f9ae53', padding: 16 },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  dayText: { fontSize: 14, color: '#fff', fontWeight: '600' },
  timeText: { fontSize: 14, color: '#fff' },
  closedText: { color: '#FED7AA' },
  contactContainer: { gap: 16 },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  contactText: { fontSize: 14, color: '#4B5563' },
  amenitiesContainer: { gap: 12 },
  amenityItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amenityText: { fontSize: 14, color: '#4B5563' },
  faqItem: { marginBottom: 16 },
  faqQuestion: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  faqQuestionText: { fontSize: 14, color: '#000', fontWeight: '600', flex: 1 },
  faqAnswer: { fontSize: 14, color: '#4B5563', lineHeight: 22, paddingTop: 16 },
  reviewsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  overallRating: { alignItems: 'center' },
  overallRatingText: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  overallRatingSubtext: { fontSize: 12, color: '#6B7280' },
  reviewItem: { marginBottom: 24 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  reviewInfo: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: '600', color: '#000' },
  reviewDate: { fontSize: 12, color: '#6B7280' },
  reviewRating: { flexDirection: 'row', gap: 2 },
  reviewComment: { fontSize: 14, color: '#4B5563', lineHeight: 22 },
  bottomButtons: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  secondaryButton: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  secondaryButtonText: { fontSize: 16, color: '#374151', fontWeight: '600' },
  primaryButton: { backgroundColor: '#FF7A00', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center' },
  featureContainer: {
    paddingBottom: 10
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
  },
  featureText: {
    fontSize: 16,
    color: "#333",
  },
});
