// app/onboarding/Onboarding3.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Onboarding3() {
  return (
    <View style={styles.container}>
      <Image
       source={{ uri: 'https://i.ibb.co/tPcgKXPF/onboarding3.png' }}// use correct path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Find Everything.{"\n"}Empower Everyone.</Text>

      <Text style={styles.description}>
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.{"\n"}
        Nullam Laoreet, Diam Sit Amet Porta Eleifend, Turpis Justo Maximus Eros.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/onboarding/Onboarding4')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '55%',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#D25A43',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 4,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
