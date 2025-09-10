// app/onboarding/Onboarding4.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as Linking from "expo-linking";

export default function Onboarding4() {
  const handleLogin = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    router.replace('/auth/Login');
  };

  const handleVendorLogin = () => {
    Linking.openURL("https://app.minorityownedbusiness.info/login?type=vendor");
  };
  const handleVendorSignup = () => {
    Linking.openURL("https://app.minorityownedbusiness.info/signup?type=vendor");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image
          source={{ uri: 'https://i.ibb.co/Y4s69B6Z/onboarding4.png' }}
          style={styles.image}
        />
        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            WE'RE{"\n"}BUILDING A{"\n"}MOVEMENT –{"\n"}WHERE DO{"\n"}YOU FIT IN?
          </Text>
        </View>
      </View>

      <Text style={styles.title}>Pick Your Role To Get Started.</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.customerBtn} onPress={handleLogin}>
          <Text style={styles.customerText}>Login As Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.vendorBtn} onPress={handleVendorLogin}>
          <Text style={styles.vendorText}>Login As Vendor</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/auth/Signup')}>
        <Text style={styles.link}>
          New Customer? <Text style={styles.underline}>Create Account</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVendorSignup}>
        <Text style={styles.link}>
          <Text style={styles.underline}>Or Become A Vendor</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-evenly',
  },
  imageRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  image: {
    width: '50%',
    height: 230,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  quoteBox: {
    width: '50%',
    backgroundColor: '#C6ECEF',
    padding: 10,
    justifyContent: 'center',
  },
  quote: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E4C59',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  customerBtn: {
    backgroundColor: '#D25A43',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 10,
  },
  vendorBtn: {
    borderWidth: 1,
    borderColor: '#00AEEF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  customerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vendorText: {
    color: '#00AEEF',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
