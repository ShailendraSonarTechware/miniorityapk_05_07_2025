import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import {
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from "../../hooks/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountSettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();
  const user1 = {
    // name: 'John Doe',
    // email: 'johndoe@gmail.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    background:
      'https://i.ibb.co/WvCN074r/8adbb0c5a13e14b47fd390cac8d8921e819ca1ec.jpg',
  };
  interface NavItem {
    icon: React.ReactNode;
    label: string;
    route: string;
  }

  interface NavSection {
    title: string;
    items: NavItem[];
  }

  const handleLogout = async () => {
    try {
      // 1. Clear auth token (and optionally other keys like user data)
    await AsyncStorage.removeItem("authToken");

      // 2. Optionally clear any global user state
      // dispatch({ type: 'LOGOUT' }); // if using context/redux

      // 3. Navigate to login screen
      router.replace('../../onboarding/Onboarding1'); // or your login route
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigationItems: NavSection[] = [
    {
      title: 'ORDERS & BOOKING',
      items: [
        {
          icon: <Feather name="user" size={20} />,
          label: 'My Account',
          route: '/MyAccount',
        },
        {
          icon: <FontAwesome name="shopping-cart" size={20} />,
          label: 'My Orders',
          route: '/MyOrders',
        },
        {
          icon: <FontAwesome name="money" size={20} />,
          label: 'Payments',
          route: '/MyAccount',
        },
        {
          icon: <AntDesign name="hearto" size={20} />,
          label: 'Wishlist',
          route: '/MyAccount',
        },
        {
          icon: <MaterialIcons name="autorenew" size={20} />,
          label: 'Return & Refund Status',
          route: '/MyAccount',
        },
        {
          icon: <Entypo name="bookmark" size={20} />,
          label: 'My Bookings',
          route: '/MyAccount',
        },
      ],
    },
    {
      title: 'OTHER SETTINGS',
      items: [
        {
          icon: <Entypo name="help-with-circle" size={20} />,
          label: 'Contact Us',
          route: '/MyAccount',
        },
        {
          icon: <AntDesign name="questioncircleo" size={20} />,
          label: 'FAQ',
          route: '/MyAccount',
        },
        {
          icon: <Feather name="headphones" size={20} />,
          label: 'Support',
          route: '/MyAccount',
        },
        {
          icon: <Ionicons name="document-text-outline" size={20} />,
          label: 'Terms & Conditions',
          route: '/MyAccount',
        },
        {
          icon: <Ionicons name="shield-checkmark-outline" size={20} />,
          label: 'Privacy Policy',
          route: '/MyAccount',
        },
      ],
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header Section (not inside ScrollView) */}
      <View style={{ position: 'relative' }}>
        {/* Background */}
        <View style={styles.backgroundWrapper}>
          <ImageBackground
            source={{ uri: user1.background }}
            style={styles.bgImage}
          >
            <TouchableOpacity
              style={[styles.backButton, { top: insets.top + 8 }]}
            >
              <AntDesign name="arrowleft" size={20} color="#000" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* Floating Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.profileOuter}>
            <View style={styles.profileInner}>
              <Image source={{ uri: user1.avatar }} style={styles.avatar} />
            </View>
          </View>
        </View>

        {/* Black Bar */}
        <View style={styles.blackBar}>
          <View style={styles.info}>
            <Text style={styles.name}>{user?.name || "Guest"}</Text>
            <View style={styles.emailRow}>
              <MaterialIcons name="edit" size={14} color="#f4a426" />
              <Text style={styles.email}>{user?.email || "guest@example.com"}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 8 }}
      >
        {navigationItems.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item: any, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  console.log('Navigating to:', item.route);
                  // router.push('../components/MyAccount');
                  router.push(item.route);
                }}
                style={({ pressed, hovered }) => [
                  styles.item,
                  // hovered && { backgroundColor: '#961f1fff' }, // hover color for web
                  pressed && { backgroundColor: '#16a1c0', color: '#ffffff' }, // press color
                ]}
              >
                <View style={styles.itemLeft}>
                  {item.icon}
                  <Text style={styles.itemText}>{item.label}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#555" />
              </Pressable>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Feather name="power" size={20} color="#000" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  backgroundWrapper: {
    height: 120, // 👈 Fixed height for background
    width: '100%',
  },
  bgImage: {
    width: '100%',
    height: 200,
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
    top: 120, // 👈 overlaps background & black bar
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  item: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 12,
    fontSize: 15,
  },
  logoutBtn: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  logoutText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
