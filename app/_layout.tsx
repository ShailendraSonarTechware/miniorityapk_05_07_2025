// app/_layout.tsx
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../hooks/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import React from "react";

function AuthGate() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff", // paints behind status bar
        }}
      >
        <StatusBar style="light" /> 
        <ActivityIndicator size="large" color="#00A9CB" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {/* SafeArea paints black under the notch/statusbar */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#D25A43" }}>
        <StatusBar style="light" />

        {!token ? (
          // 🔒 Auth stack
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#000" },
            }}
          >
            <Stack.Screen name="auth/Login" />
            <Stack.Screen name="auth/Signup" />
            <Stack.Screen name="auth/SignupVendor" />
            <Stack.Screen name="auth/ForgotPassword" />
          </Stack>
        ) : (
          // 🔑 Main app
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#D25A43" },
            }}
          >
            <Stack.Screen name="onboarding/Onboarding1" />
            <Stack.Screen name="onboarding/Onboarding2" />
            <Stack.Screen name="onboarding/Onboarding3" />
            <Stack.Screen name="onboarding/Onboarding4" />

            <Stack.Screen name="products/index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthGate />
      </CartProvider>
    </AuthProvider>
  );
}
