import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput, Checkbox } from "react-native-paper";

interface AddressFormProps {
  visible: boolean;
  onClose: () => void;
  onSave: (address: any) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ visible, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    default: false,
  });

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address1 ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.country
    ) {
      alert("Please fill all required fields (*)");
      return;
    }
    onSave(form); // Save the address to the parent component
    onClose(); // Close the modal
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Select or Add Address</Text>
            <Text style={styles.subtitle}>No saved addresses yet.</Text>
            <Text style={styles.subtitle}>Or, add a new address</Text>

            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="Full name *"
                style={[styles.input, { flex: 1, marginRight: 5 }]}
                value={form.name}
                onChangeText={(val) => handleChange("name", val)}
              />
              <TextInput
                mode="outlined"
                label="Phone *"
                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                value={form.phone}
                keyboardType="phone-pad"
                onChangeText={(val) => handleChange("phone", val)}
              />
            </View>

            <TextInput
              mode="outlined"
              label="Address line 1 *"
              style={styles.input}
              value={form.address1}
              onChangeText={(val) => handleChange("address1", val)}
            />

            <TextInput
              mode="outlined"
              label="Address line 2"
              style={styles.input}
              value={form.address2}
              onChangeText={(val) => handleChange("address2", val)}
            />

            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="City *"
                style={[styles.input, { flex: 1, marginRight: 5 }]}
                value={form.city}
                onChangeText={(val) => handleChange("city", val)}
              />
              <TextInput
                mode="outlined"
                label="State/Region *"
                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                value={form.state}
                onChangeText={(val) => handleChange("state", val)}
              />
            </View>

            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="Postal code *"
                style={[styles.input, { flex: 1, marginRight: 5 }]}
                value={form.zip}
                keyboardType="numeric"
                onChangeText={(val) => handleChange("zip", val)}
              />
              <TextInput
                mode="outlined"
                label="Country *"
                style={[styles.input, { flex: 1, marginLeft: 5 }]}
                value={form.country}
                onChangeText={(val) => handleChange("country", val)}
              />
            </View>

            <View style={styles.checkboxRow}>
              <Checkbox
                status={form.default ? "checked" : "unchecked"}
                onPress={() => handleChange("default", !form.default)}
              />
              <Text style={styles.checkboxLabel}>Set as default</Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleSave}>
              <Text style={styles.addBtnText}>Add Address</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddressForm;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "90%",
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 8 },
  input: { marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  checkboxLabel: { fontSize: 14 },
  addBtn: {
    backgroundColor: "#E07B39",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },
  cancelBtn: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  cancelText: { color: "#333", fontWeight: "600" },
});
