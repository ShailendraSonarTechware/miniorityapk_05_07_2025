// app/onboarding/Onboarding1.tsx
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function Onboarding2() {
  return (
    <View>
      <Text>Welcome to App - Page 2</Text>
      <Button title="Next" onPress={() => router.push('/onboarding/Onboarding3')} />
    </View>
  );
}
