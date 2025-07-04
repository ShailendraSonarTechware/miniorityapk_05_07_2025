import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = () => {
    // TODO: validate credentials
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>LOGIN</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.inline}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setKeepSignedIn(!keepSignedIn)} style={styles.fakeCheckbox}>
            <MaterialIcons
              name={keepSignedIn ? 'check-box' : 'check-box-outline-blank'}
              size={20}
              color="#007B9F"
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Keep Me Signed In</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/auth/ForgotPassword')}>
          <Text style={styles.forgot}>Forget Password</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/Signup')}>
        <Text style={styles.link}>
          New Customer? <Text style={styles.underline}>Create Account</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or sign up with social account</Text>

      <View style={styles.socialIcons}>
        <Image source={{ uri: 'https://i.ibb.co/ccGRMKWH/facebook.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://i.ibb.co/ZwKkzXb/google.png' }} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  backBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: 'black'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    color: '#888',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fakeCheckbox: {
    marginRight: 6,
  },
  checkboxLabel: {
    color: '#888',
  },
  forgot: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  signInBtn: {
    backgroundColor: '#00A9CB',
    paddingVertical: 14,
    borderRadius: 4,
    marginTop: 24,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  socialText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#444',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 12,
  },
});
