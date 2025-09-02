import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createBooking } from "../../services/createBooking"; // ✅ Import API function
import { Checkbox } from "react-native-paper";

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  serviceId: string;
  services: { _id: string; name: string }[];
}
const BookingModal = ({ visible, onClose, serviceId, services }: BookingModalProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Spa");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const toggleService = (serviceName: string) => {
  if (selectedServices.includes(serviceName)) {
    setSelectedServices(selectedServices.filter((s) => s !== serviceName));
  } else {
    setSelectedServices([...selectedServices, serviceName]);
  }
};

 const handleSubmit = async () => {
  if (!name || !email || !phone) {
    Alert.alert("Error", "Please fill all fields");
    return;
  }

  const payload = {
    serviceId,                        // parent service ID
    serviceItems: selectedServices,   // ✅ no extra []
    date: date.toISOString().split("T")[0],
    time: time.toTimeString().slice(0, 5),
    name,
    email,
    phone,
    notes: `Customer: ${name}, Phone: ${phone}`,
    paymentStatus: "pending",
    amountPaid: 0,
  };

  console.log("Payload being sent:", JSON.stringify(payload, null, 2)); // 🔍 debug

  try {
    await createBooking(payload);
    Alert.alert("Success", "Appointment Requested!");
    // 🔑 Reset fields
    setName("");
    setEmail("");
    setPhone("");
    setSelectedServices([]);  // ✅ also reset service checkboxes
    onClose();
  } catch (err) {
    console.error("Booking Error:", err);
    Alert.alert("Error", "Failed to book appointment. Try again.");
  }
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
           {/* Service Selector */}
          {/* Service Selector (Multiple Choice) */}
{/* <Text style={styles.label}>Select Services</Text> */}
{services.map((s) => (
  <TouchableOpacity
    key={s._id}
    style={styles.checkboxRow}
    onPress={() => toggleService(s.name)}
  >
    <Checkbox
      status={selectedServices.includes(s.name) ? "checked" : "unchecked"}
      onPress={() => toggleService(s.name)}
    />
    <Text>{s.name}</Text>
  </TouchableOpacity>
))}

          {/* 📅 Date Picker */}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowDate(true)}>
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDate(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* ⏰ Time Picker */}
          <Text style={styles.label}>Select Time</Text>
          <TouchableOpacity style={styles.input} onPress={() => setShowTime(true)}>
            <Text>{time.toTimeString().slice(0, 5)}</Text>
          </TouchableOpacity>
          {showTime && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTime(false);
                if (selectedTime) setTime(selectedTime);
              }}
            />
          )}

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
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 6,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 5,
    borderRadius: 4,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#11a5c3",
    padding: 12,
    marginTop: 20,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxRow: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 5,
}

});
