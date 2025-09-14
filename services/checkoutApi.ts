import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartInitiatePayload = {
  items: Array<{
    productId: string;
    variantId?: string;
    size?: string;
    quantity: number;
    price: number;
    image?: string;
    title?: string;
    color?: string;
    label?: string;
  }>;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  userNote?: string;
  // Optional: hint to server to also create a hosted payment link
  paymentLink?: boolean;
};

export type InitiateResp = {
  success: boolean;
  message: string;
  groupOrderId: string;
  orderId: string;
  clientSecret: string;
  // Optional if your backend adds it:
  paymentUrl?: string;
};

export const initiateOrder = async (payload: CartInitiatePayload): Promise<InitiateResp> => {
  const token = await AsyncStorage.getItem("authToken");
  const res = await api.post("/orders/initiate", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
