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

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);

  const handleRegister = () => {
    // TODO: validate and register
    router.replace('/auth/Login');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>SIGN UP</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Create a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Optional visibility toggle */}
        {/* <TouchableOpacity>
          <Image source={require('../../assets/icons/eye-off.png')} style={styles.eyeIcon} />
        </TouchableOpacity> */}
      </View>

      {/* Custom Checkbox */}
      <View style={styles.policyRow}>
        <TouchableOpacity onPress={() => setAgreePolicy(!agreePolicy)} style={styles.fakeCheckbox}>
          <MaterialIcons
            name={agreePolicy ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color="#007B9F"
          />
        </TouchableOpacity>
        <Text style={styles.policyText}>
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Text style={styles.policyLink}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/Login')}>
        <Text style={styles.loginLink}>
          Already A Member? <Text style={styles.underline}>Sign In</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Or sign up with social account</Text>
      <View style={styles.socialIcons}>
        <Image source={{ uri: 'https://i.ibb.co/ccGRMKWH/facebook.png' }}  style={styles.icon} />
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
  },
  backArrow: {
    fontSize: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
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
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 22,
    height: 22,
    marginLeft: 8,
  },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 14,
    marginBottom: 20,
  },
  fakeCheckbox: {
    marginTop: 2,
    marginRight: 6,
  },
  policyText: {
    flex: 1,
    color: '#777',
    fontSize: 13,
  },
  policyLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#000',
  },
  registerBtn: {
    backgroundColor: '#00A9CB',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 24,
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
    marginHorizontal: 12,
  },
});
