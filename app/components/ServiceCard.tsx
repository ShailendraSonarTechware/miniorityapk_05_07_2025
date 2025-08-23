// components/ServiceCard.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Heart, Star, MapPin } from "lucide-react-native";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    category: string;
    type: string[];
    image: string;
    rating: number;
    reviews: number;
    location: string;
    distance: string;
  };
  onPress?: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Left: Square Image */}
      <Image source={{ uri: service.image }} style={styles.image} />

      {/* Right Content */}
      <View style={styles.content}>
        {/* Category + Heart */}
        <View style={styles.header}>
          <Text style={styles.category}>{service.category}</Text>
          <TouchableOpacity>
            <Heart size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {service.name}
        </Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {service.type.slice(0, 2).map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <MapPin size={14} color="#999" />
          <Text style={styles.location} numberOfLines={1}>
            {service.location}
          </Text>
        </View>

        {/* Rating + Distance */}
        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.rating}>{service.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>({service.reviews})</Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{service.distance} Away</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    overflow: "hidden",
    alignItems: "center",
     paddingLeft:8
  },
 image: {
  width: 110,
  height: 110, // fixed square
//   borderRadius: 12, 
  resizeMode: "cover", // 🔥 makes it fill the square completely
  paddingTop: 10
},
  content: { flex: 1, padding: 10, justifyContent: "space-between" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  category: { fontSize: 12, fontWeight: "700", color: "#00BCD4" },
  name: { fontSize: 14, fontWeight: "700", color: "#333" },
  tagsRow: { flexDirection: "row", marginVertical: 4, flexWrap: "wrap" },
  tag: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 6,
  },
  tagText: { fontSize: 12, color: "#555" },
  locationRow: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  location: { marginLeft: 4, fontSize: 12, color: "#777", flex: 1 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  rating: { marginLeft: 4, fontSize: 12, fontWeight: "600", color: "#333" },
  reviews: { marginLeft: 4, fontSize: 12, color: "#888" },
  distanceBadge: {
    backgroundColor: "#FF8C00",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  distanceText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
