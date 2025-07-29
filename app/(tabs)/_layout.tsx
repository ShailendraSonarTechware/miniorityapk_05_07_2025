import { Tabs } from 'expo-router';
import {
  Home,
  Search,
  Heart,
  User,
  ShoppingBag,
  Settings,
} from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a1c0',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingTop: 4,
          paddingBottom: 4,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="pricetags" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ size, color }) => (
            // <ShoppingBag size={size} color={color} />
            <Ionicons name="cart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="food-listing"
        options={{ href: null }} // hides tab icon but keeps it in tab layout
      />
      <Tabs.Screen
        name="MyAccount"
        options={{ href: null }} // hides tab icon but keeps it in tab layout
      />
      <Tabs.Screen
        name="profile"
        // options={{
        //   title: 'profile',
        //   tabBarIcon: ({ size, color }) => (
        //     <User size={size} color={color} />
        //   ),
        // }}
        options={{ href: null }}
      />
    </Tabs>
  );
}
