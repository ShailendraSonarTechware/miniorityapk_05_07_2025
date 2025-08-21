// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider, useAuth } from "../hooks/AuthContext";
import React from "react";

function AuthGate() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00A9CB" />
      </View>
    );
  }

  // 🔒 No token → only auth stack
  if (!token) {
    return (
      <>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth/Login" />
          <Stack.Screen name="auth/Signup" />
          <Stack.Screen name="auth/SignupVendor" />
          <Stack.Screen name="auth/ForgotPassword" />
        </Stack>
      </>
    );
  }

  // 🔑 With token → everything else
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Onboarding Screens */}
        <Stack.Screen name="onboarding/Onboarding1" />
        <Stack.Screen name="onboarding/Onboarding2" />
        <Stack.Screen name="onboarding/Onboarding3" />
        <Stack.Screen name="onboarding/Onboarding4" />

        {/* Main Products & Tabs */}
        <Stack.Screen name="products/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
