// app/onboarding/Onboarding1.tsx
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Onboarding1() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.ibb.co/ZRK1fCQf/onboardimage.png' }}style={styles.logo} />
      {/* <Text style={styles.title}>Welcome to Our App</Text> */}
      <Text style={styles.subtitle}>Where culture and commerce connect!</Text>
      <Button title="Next" onPress={() => router.push('/onboarding/Onboarding3')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // white background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 338,
    height: 91,
    // marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: -20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
