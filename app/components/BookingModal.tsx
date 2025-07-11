import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // ✅ Icon package

const BookingModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Spa');

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      Alert.alert('Please fill all fields');
      return;
    }
    console.log({ name, email, phone, service });
    Alert.alert('Appointment Requested!');

    // 🔑 Clear all fields
   setName('');
  setEmail('');
  setPhone('');
  setService('Spa');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          
          {/* ❌ Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>SCHEDULE A BOOKING</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Enter Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>What Type Of Service Do You Need?</Text>
          {['Spa', 'Skin Treatment', 'Hair Salon', 'Laser Hair Removal'].map((option) => (
            <View key={option} style={styles.radioRow}>
              <RadioButton
                value={option}
                status={service === option ? 'checked' : 'unchecked'}
                onPress={() => setService(option)}
              />
              <Text onPress={() => setService(option)}>{option}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Request An Appointment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 2,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#11a5c3',
    padding: 12,
    marginTop: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
