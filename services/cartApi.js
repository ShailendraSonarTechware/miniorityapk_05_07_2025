import api from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getAuthHeader() {
  const token = await AsyncStorage.getItem("authToken");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

// ✅ Get full cart
export const getCart = async () => {
  const res = await api.get("/cart", await getAuthHeader());
  return res.data.cart;
};

// ✅ Add item
export const addItemToCart = async (item) => {
  const res = await api.post("/cart/add", item, await getAuthHeader());
  return res.data.cart;
};

// ✅ Update item by ID
export const updateCartItem = async (cartItemId, updates) => {
  const res = await api.put(`/cart/update/${cartItemId}`, updates, await getAuthHeader());
  return res.data.cart;
};

// ✅ Remove item by ID
export const removeCartItem = async (cartItemId) => {
  const res = await api.delete(`/cart/remove/${cartItemId}`, await getAuthHeader());
  return res.data.cart;
};

// ✅ Update by composite
export const updateCartItemByComposite = async (data) => {
  const res = await api.put("/cart/update-quantity", data, await getAuthHeader());
  return res.data.cart;
};

// ✅ Remove by composite
export const removeCartItemByComposite = async (data) => {
  const res = await api.delete("/cart/remove", {
    ...(await getAuthHeader()),
    data,
  });
  return res.data.cart;
};
