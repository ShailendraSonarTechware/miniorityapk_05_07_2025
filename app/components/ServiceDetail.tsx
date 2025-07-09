import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { ChevronLeft, Heart, Star, CreditCard as Edit3, Share2, Copy, Phone, MapPin, Globe, Clock, Check, Plus, Minus } from 'lucide-react-native';
import SearchHeader from './SearchHeader';

const { width } = Dimensions.get('window');

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

interface Hours {
  day: string;
  time: string;
  isOpen: boolean;
}

export default function ServiceDetail() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3757956/pexels-photo-3757956.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3757969/pexels-photo-3757969.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3757964/pexels-photo-3757964.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const hours: Hours[] = [
    { day: 'Monday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Tuesday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Wednesday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Thursday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Friday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Saturday', time: '9:00 A.M - 6:00 P.M', isOpen: true },
    { day: 'Sunday', time: 'Closed', isOpen: false },
  ];

  const amenities = [
    'Appointment Booking Only',
    'Accepts Credit Card',
    'Free WiFi',
    'Wheelchair Accessible',
    'Masks Required',
    'Accepts Insurance',
    'Gender-Neutral Restrooms',
  ];

  const reviews: Review[] = [
    {
      id: '1',
      name: 'John Doe',
      date: 'Sep 16',
      rating: 5,
      comment: 'Good Product. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '2',
      name: 'Jane Smith',
      date: 'Sep 12',
      rating: 4,
      comment: 'Great experience! The staff was professional and the atmosphere was very relaxing. Will definitely come back.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  const faqItems: FAQ[] = [
    {
      id: '1',
      question: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      expanded: false,
    },
    {
      id: '2',
      question: 'Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse',
      answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      expanded: false,
    },
    {
      id: '3',
      question: 'Excepteur Sint Occaecat Cupidatat Non Proident',
      answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      expanded: false,
    },
  ];

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    <View style={styles.SearchHeader}>
  <SearchHeader />
</View>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity >
            {/* <ChevronLeft size={24} color="#000" /> */}
          </TouchableOpacity>
          
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

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        {/* Service Info */}
        <View style={styles.serviceInfo}>
          <Text style={styles.categoryText}>HAIR & BEAUTY</Text>
          <Text style={styles.serviceTitle}>ORCHID BEAUTY SPA CARE & BEAUTY SERVICES</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingRow}>
              {renderStars(4.9)}
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <Text style={styles.reviewCount}>196 RATINGS AND 5 REVIEWS</Text>
          </View>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>

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

        {/* Photo Gallery */}
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

        {/* Location and Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LOCATIONS AND HOURS</Text>
          <View style={styles.mapContainer}>
            <Text style={styles.mapPlaceholder}>Map View</Text>
          </View>
          <View style={styles.hoursContainer}>
            {hours.map((hour, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.dayText}>{hour.day}</Text>
                <Text style={[styles.timeText, !hour.isOpen && styles.closedText]}>
                  {hour.time}
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
              <Text style={styles.contactText}>281-746-3789</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#FF7A00" />
              <Text style={styles.contactText}>xyz@orchidbeauty.com</Text>
            </View>
            <View style={styles.contactItem}>
              <MapPin size={20} color="#FF7A00" />
              <Text style={styles.contactText}>Address: 123 Beauty Lane, Spa City, SC 12345</Text>
            </View>
            <View style={styles.contactItem}>
              <Globe size={20} color="#FF7A00" />
              <Text style={styles.contactText}>orchidbeauty.com</Text>
            </View>
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AMENITIES</Text>
          <View style={styles.amenitiesContainer}>
            {amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Check size={16} color="#10B981" />
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQ</Text>
          {faqItems.map((item) => (
            <View key={item.id} style={styles.faqItem}>
              <TouchableOpacity
                onPress={() => toggleFAQ(item.id)}
                style={styles.faqQuestion}
              >
                <Text style={styles.faqQuestionText}>{item.question}</Text>
                {expandedFAQ === item.id ? (
                  <Minus size={20} color="#FF7A00" />
                ) : (
                  <Plus size={20} color="#FF7A00" />
                )}
              </TouchableOpacity>
              {expandedFAQ === item.id && (
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
              <Text style={styles.overallRatingText}>4.9</Text>
              <Text style={styles.overallRatingSubtext}>196 RATINGS AND 5 REVIEWS</Text>
            </View>
          </View>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    SearchHeader: {
      paddingTop: 10,
      paddingBottom: 10,  
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
    top: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: -25,
    zIndex: 2,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceInfo: {
    padding: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#16a1c0',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#16a1c0',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  galleryContainer: {
    flexDirection: 'row',
  },
  galleryItem: {
    marginRight: 12,
    // borderRadius: 8,
    overflow: 'hidden',
  },
  selectedGalleryItem: {
    borderWidth: 2,
    borderColor: '#FF7A00',
  },
  galleryImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#F3F4F6',
    // borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
  },
  hoursContainer: {
    backgroundColor: '#f9ae53',
    // borderRadius: 8,
    padding: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  timeText: {
    fontSize: 14,
    color: '#fff',
  },
  closedText: {
    color: '#FED7AA',
  },
  contactContainer: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#4B5563',
  },
  amenitiesContainer: {
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amenityText: {
    fontSize: 14,
    color: '#4B5563',
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  faqQuestionText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    paddingTop: 16,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  overallRating: {
    alignItems: 'center',
  },
  overallRatingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  overallRatingSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewItem: {
    marginBottom: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});