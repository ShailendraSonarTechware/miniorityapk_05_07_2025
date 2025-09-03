import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addItemToCart, updateCartItemByComposite, removeCartItemByComposite } from "../services/cartApi";

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

  const addToCart = async (payload: any) => {
    const res = await addItemToCart(payload);
    if (res?.cart) {
      setCart(res.cart);
    } else {
      await refreshCart();
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
