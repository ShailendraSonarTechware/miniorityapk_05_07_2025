import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get user orders with filters
export const getOrders = async (statusFilter: string, timeFilter: string) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return [];
    }

    const res = await api.get(
      `/orders/user?status=${statusFilter}&time=${timeFilter}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.orders || [];
  } catch (err) {
    console.error("Error fetching orders", err);
    return [];
  }
};
