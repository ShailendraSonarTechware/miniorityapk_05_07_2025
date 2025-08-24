// components/ServicePreview.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getServices } from "../../services/serviceApi";
import ServiceCard from "../components/ServiceCard";
import { router } from "expo-router";

export default function ServicePreview() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await getServices();
        if (json.success && json.data) {
          const mapped = json.data.slice(0, 3).map((item: any) => ({
            id: item._id,
            name: item.title,
            category: "SKIN & BEAUTY",
            type: item.services?.map((s: any) => s.name) || ["General Service"],
            image: item.coverImage,
            rating: item.averageRating || 0,
            reviews: item.totalReviews || 0,
            location: item.contact?.address || "Not Available",
            distance: "0.8km", // mock for now
            slug: item.slug
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.error("Preview fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
  <Text style={styles.heading}>Featured Services</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#FF8C00" />
  ) : (
    services.map((s) => (
      
      <ServiceCard
        key={s._id} // use _id from API instead of id
        service={s}
        onPress={() => router.push(`/service/${s.slug}` as any)}
      />
    ))
  )}
</View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 20 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#333" },
});
