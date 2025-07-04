// app/_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        // Force onboarding to show on Web
        if (Platform.OS === 'web') {
          setInitialRoute('onboarding/Onboarding1');
        } else {
          // For mobile, check if onboarding is complete
          const completed = await AsyncStorage.getItem('onboardingCompleted');
          setInitialRoute(completed === 'true' ? '(tabs)' : 'onboarding/Onboarding1');
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
        setInitialRoute('onboarding/Onboarding1'); // Default to Onboarding if there's an error
      }
    };

    checkOnboarding();
  }, []);

  if (initialRoute === null) return null; // Prevent flicker

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        {/* Onboarding Screens */}
        <Stack.Screen name="onboarding/Onboarding1" />
        <Stack.Screen name="onboarding/Onboarding2" />
        <Stack.Screen name="onboarding/Onboarding3" />
        <Stack.Screen name="onboarding/Onboarding4" />
        
        {/* Authentication Screens */}
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="auth/SignupVendor" />
        <Stack.Screen name="auth/ForgotPassword" />
        
        {/* Main Products & Tabs */}
        <Stack.Screen name="products/index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
