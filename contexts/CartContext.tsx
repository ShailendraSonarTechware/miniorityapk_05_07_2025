import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addItemToCart, updateCartItemByComposite, removeCartItemByComposite } from "../services/cartApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>(null);

  const refreshCart = async () => {
    try {
      const fresh = await getCart();
      setCart(fresh);
    } catch (e) {
      console.error("refreshCart error", e);
    }
  };

  // const addToCart = async (payload: any) => {
  //   const res = await addItemToCart(payload);
  //   if (res?.cart) {
  //     setCart(res.cart);
  //   } else {
  //     await refreshCart();
  //   }
  // };
  const addToCart = async (payload: any) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    // No token → force login
    if (!token) {
      router.push("/auth/Login"); // adjust path to your login page
      return;
    }

    const res = await addItemToCart(payload);

    if (res?.cart) {
      setCart(res.cart);
    } else {
      await refreshCart();
    }
  } catch (err: any) {
    console.error("addToCart error:", err);

    // Backend says invalid/expired token → clear and redirect
    if (err.response?.status === 401 || err.response?.data?.message === "Invalid token") {
      await AsyncStorage.removeItem("authToken");
      router.push("/auth/Login");
    }

    throw err; // rethrow so UI can still show alert if needed
  }
};

  const updateCart = async (payload: any) => {
    await updateCartItemByComposite(payload);
    await refreshCart();
  };

  const removeFromCart = async (payload: any) => {
    await removeCartItemByComposite(payload);
    await refreshCart();
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, refreshCart, addToCart, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
