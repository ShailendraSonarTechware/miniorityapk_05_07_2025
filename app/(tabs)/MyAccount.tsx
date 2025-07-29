import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
const MyAccount = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = {
    name: 'John Doe',
    dob: '12.04.1998',
    email: 'johndoe@gmail.com',
    age: 27,
    gender: 'Male',
    address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    timeZone: 'Hyderabad',
    location: 'India',
    zipCode: '111111',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    background:
      'https://i.ibb.co/WvCN074r/8adbb0c5a13e14b47fd390cac8d8921e819ca1ec.jpg',
  };

  return (
    <>
      {/* Header Section (not inside ScrollView) */}
      <View style={{ position: 'relative' }}>
        {/* Background */}
        <View style={styles.backgroundWrapper}>
          <ImageBackground
            source={{ uri: user.background }}
            style={styles.bgImage}
          >
            <TouchableOpacity
              style={[styles.backButton, { top: insets.top + 8 }]}
              onPress={() => router.push('/setting')}
            >
              <AntDesign name="arrowleft" size={20} color="#000" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Floating Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.profileOuter}>
            <View style={styles.profileInner}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
          </View>
        </View>
      </View>
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text>
          <View style={styles.row}>
            <Label label="Name" value={user.name} />
          </View>
          <View style={styles.row}>
            <Label label="DOB" value={user.dob} />
          </View>
          <View style={styles.row}>
            <Label label="Email Address" value={user.email} grey />
          </View>
          <View style={styles.row}>
            <Label label="Age" value={user.age.toString()} />
          </View>
          <View style={styles.row}>
            <Label label="Gender" value={user.gender} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ADDRESS</Text>
          <View style={styles.row}>
            <Label label="Address" value={user.address} multiline />
          </View>
          <View style={styles.row}>
            <Label label="Time Zone" value={user.timeZone} />
          </View>
          <View style={styles.row}>
            <Label label="Location" value={user.location} />
          </View>
          <View style={styles.row}>
            <Label label="Zip Code" value={user.zipCode} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
          <Pressable style={styles.addButton}>
            <Text style={styles.addText}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

const Label = ({ label, value, grey = false, multiline = false }: any) => (
  <View style={styles.labelRow}>
    <Text style={styles.labelText}>{label}</Text>
    <Text
      style={[
        styles.valueText,
        grey && styles.greyText,
        multiline && styles.multilineValue,
      ]}
      numberOfLines={multiline ? 0 : 1}
    >
      : {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  backgroundWrapper: {
    height: 180, // 👈 Fixed height for background
    width: '100%',
  },
  bgImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 20,
    zIndex: 2,
  },
  blackBar: {
    marginTop: 40,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 80, // 👈 overlaps background & black bar
    left: 16,
    zIndex: 3,
  },
  profileOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  info: {
    marginLeft: 'auto', // pushes it to the right
    alignItems: 'flex-end',
  },
  name: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  email: {
    marginLeft: 6,
    color: '#f4a426',
    fontSize: 14,
  },
  header: {
    backgroundColor: '#1e1e1e',
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 15,
    right: 140,
    backgroundColor: '#16a1c0',
    borderRadius: 20,
    padding: 6,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  row: {
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },

  labelText: {
    fontWeight: '600',
    color: '#333',
    width: 120, // Fixed width for labels
  },

  valueText: {
    color: '#000',
    fontWeight: '600',
    flex: 1,
  },

  greyText: {
    color: '#999',
  },

  multilineValue: {
    flexWrap: 'wrap',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 50,
  },
  saveButton: {
    backgroundColor: '#cc5c3f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    borderColor: '#16a1c0',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  addText: {
    color: '#16a1c0',
    fontWeight: 'bold',
  },
});

export default MyAccount;
