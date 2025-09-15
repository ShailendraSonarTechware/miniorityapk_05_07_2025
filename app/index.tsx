// app/index.tsx
import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/AuthContext";

export default function Index() {
  const router = useRouter();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (token) {
      // token exists -> navigate to main tabs (adjust route as needed)
      router.replace("/(tabs)"); // or "/" if your tabs index is at root
    } else {
      // not logged in -> show auth login page
      router.replace("/auth/Login");
    }
  }, [token, loading]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? <ActivityIndicator size="large" /> : <Text>Redirecting…</Text>}
    </View>
  );
}
