import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getMinorityTypes } from "../../services/minorityTypes";
import { registerUser } from "../../services/authApi";

const GENDERS = [
  { label: 'Select Gender', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [minority, setMinority] = useState('');
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);

  const [loadingMinority, setLoadingMinority] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  // Fetch minority types
  useEffect(() => {
    (async () => {
      try {
        setLoadingMinority(true);
        const data = await getMinorityTypes();
        setOptions([
          { label: 'Select Minority Type', value: '' },
          ...data.map((x: any) => ({ label: x.name, value: x._id })),
        ]);
      } catch (err) {
        console.error("Failed to load minority types:", err);
      } finally {
        setLoadingMinority(false);
      }
    })();
  }, []);

  // Validation
  const validate = () => {
    if (!firstName.trim()) return 'First name is required';
    if (!lastName.trim()) return 'Last name is required';
    if (!mobile || mobile.length < 10) return 'Enter a valid mobile number';
    if (!minority) return 'Please select a minority type';
    if (!gender) return 'Please select a gender';
    if (!email.match(/^\S+@\S+\.\S+$/)) return 'Enter a valid email';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!agreePolicy) return 'You must agree to the Privacy Policy';
    return null;
  };

  const handleRegister = async () => {
    // const err = validate();
    // if (err) {
    //   Alert.alert('Invalid Input', err);
    //   return;
    // }
    // console.log("Validation result:", validate());


    const payload = {
      name: firstName + " " + lastName,
      email,
      mobile,
      minorityType: minority,
      gender,   // already lowercase now
      password,
      role: "customer",
    };
    console.log("Payload being sent:", payload);



    setLoadingRegister(true);

    try {
      console.log("Register button pressed");

      // Call API
      const res = await registerUser(payload);
      console.log("API Response:", res);

      if (res && res.success) {
  Alert.alert("Success", res.message);
  router.push({
    pathname: "/auth/OtpVerify",
    params: { email },
  });
} else {
        Alert.alert("Error", res?.message || "Registration failed");
      }

    } catch (err: unknown) {
      let message = "Server error";

      // Axios error check
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as any;
        message = axiosErr.response?.data?.message || message;
      }
      // Native JS Error
      else if (err instanceof Error) {
        message = err.message;
      }

      Alert.alert("Error", message);
    } finally {
      setLoadingRegister(false);
    }
  };



  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f9f9f9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.header}>Create Account</Text>

        <View style={styles.card}>
          {/* First Name */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />

          {/* Last Name */}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />

          {/* Mobile */}
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            value={mobile}
            onChangeText={t => setMobile(t.replace(/[^\d]/g, '').slice(0, 15))}
            keyboardType="phone-pad"
          />

          {/* Minority Type */}
          <Text style={styles.label}>Minority Type</Text>
          <View style={styles.pickerCard}>
            {loadingMinority ? (
              <ActivityIndicator style={{ padding: 10 }} />
            ) : (
              <Picker selectedValue={minority} onValueChange={setMinority}>
                {options.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            )}
          </View>

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerCard}>
            <Picker selectedValue={gender} onValueChange={setGender}>
              {GENDERS.map(opt => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Create a password"
              secureTextEntry={!showPwd}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPwd(p => !p)} style={styles.eyeBtn}>
              <MaterialIcons name={showPwd ? 'visibility' : 'visibility-off'} size={22} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Privacy Policy */}
          <View style={styles.policyRow}>
            <TouchableOpacity onPress={() => setAgreePolicy(!agreePolicy)} style={styles.fakeCheckbox}>
              <MaterialIcons
                name={agreePolicy ? 'check-box' : 'check-box-outline-blank'}
                size={20}
                color="#007B9F"
              />
            </TouchableOpacity>
            <Text style={styles.policyText}>
              I agree to the <Text style={styles.policyLink}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
            disabled={loadingRegister}
            activeOpacity={0.8}
          >
            {loadingRegister ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerText}>Register</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Sign In */}
        <TouchableOpacity onPress={() => router.push('/auth/Login')} style={{ marginTop: 16 }}>
          <Text style={styles.loginLink}>
            Already have an account? <Text style={styles.underline}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        {/* Social */}
        <Text style={styles.socialText}>Or sign up with social account</Text>
        <View style={styles.socialIcons}>
          <Image source={{ uri: 'https://i.ibb.co/ccGRMKWH/facebook.png' }} style={styles.socialBtn} />
          <Image source={{ uri: 'https://i.ibb.co/ZwKkzXb/google.png' }} style={styles.socialBtn} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f9f9f9', paddingBottom: 40 },
  backBtn: { marginTop: 10, marginBottom: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 5 },
  label: { fontWeight: '600', color: '#666', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 0.5, borderColor: '#ccc', borderRadius: 8, padding: 12, backgroundColor: '#fafafa' },
  pickerCard: { borderWidth: 0.5, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fafafa', marginBottom: 10 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  eyeBtn: { marginLeft: 8, padding: 6 },
  policyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14, marginBottom: 20 },
  fakeCheckbox: { marginRight: 8 },
  policyText: { flex: 1, fontSize: 13, color: '#777' },
  policyLink: { textDecorationLine: 'underline', color: '#007B9F' },
  registerBtn: { backgroundColor: '#00A9CB', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  registerText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  loginLink: { textAlign: 'center', fontWeight: '500', color: '#555' },
  underline: { textDecorationLine: 'underline', fontWeight: '600' },
  socialText: { textAlign: 'center', marginTop: 30, color: '#444', fontWeight: '500' },
  socialIcons: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  socialBtn: { width: 50, height: 50, borderRadius: 25, marginHorizontal: 12, backgroundColor: '#fff', padding: 6, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 },
});
