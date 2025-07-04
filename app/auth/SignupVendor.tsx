import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SignupVendor() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    license: '',
    businessName: '',
    minorityType: '',
    mobile: '',
    password: '',
  });

  const [agree, setAgree] = useState(false);

  const handleInput = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    // TODO: register logic
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.header}>SIGN UP</Text>

      {[{ label: 'First Name', key: 'firstName' },
        { label: 'Last Name', key: 'lastName' },
        { label: 'Email', key: 'email' },
        { label: 'License Number*', key: 'license' },
        { label: 'Business Name*', key: 'businessName' }
      ].map(({ label, key }) => (
        <View key={key}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={form[key as keyof typeof form]}
            onChangeText={(value) => handleInput(key, value)}
            placeholder={`Enter ${label}`}
          />
        </View>
      ))}

      <Text style={styles.label}>Minority Type*</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.minorityType}
          onValueChange={(value) => handleInput('minorityType', value)}
        >
          <Picker.Item label="-- CHOOSE ONE --" value="" />
          <Picker.Item label="Women-Owned" value="women" />
          <Picker.Item label="Veteran-Owned" value="veteran" />
          <Picker.Item label="LGBTQ+" value="lgbtq" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <Text style={styles.label}>Mobile Number*</Text>
      <TextInput
        style={styles.input}
        value={form.mobile}
        onChangeText={(value) => handleInput('mobile', value)}
        placeholder="Enter mobile number"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Create a password"
          secureTextEntry
          value={form.password}
          onChangeText={(value) => handleInput('password', value)}
        />
      </View>

      <View style={styles.policyRow}>
        <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.fakeCheckbox}>
          <MaterialIcons
            name={agree ? 'check-box' : 'check-box-outline-blank'}
            size={20}
            color="#007B9F"
          />
        </TouchableOpacity>
        <Text style={styles.policyText}>
          Your personal data will be used to support your experience throughout this website,
          to manage access to your account, and for other purposes described in our <Text style={styles.policyLink}>Privacy Policy</Text>
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
        <Image source={{ uri: 'https://i.ibb.co/ccGRMKWH/facebook.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://i.ibb.co/ZwKkzXb/google.png' }} style={styles.icon} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    flex: 1,
  },
  backBtn: {
    marginTop: 20,
    marginBottom: 20,
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
  pickerWrapper: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
