import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // TODO: handle forgot password logic (e.g., API call)
    console.log(`Reset email sent to ${email}`);
    router.replace('/auth/Login');
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>FORGET PASSWORD</Text>

      {/* Email input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Description */}
      <Text style={styles.info}>
        Please enter your email address. You will receive a link to create a new password via Email.
      </Text>

      {/* Send Button */}
      <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
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
    marginTop:20,
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  info: {
    color: '#888',
    fontSize: 14,
    marginBottom: 24,
  },
  sendBtn: {
    backgroundColor: '#00A9CB',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
