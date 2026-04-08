'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  subtotalFormatted: string;
  shipping: number;
  shippingFormatted: string;
  discount: number;
  discountFormatted: string;
  total: number;
  totalFormatted: string;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'ah-cart';

function formatCOP(price: number): string {
  return '$' + new Intl.NumberFormat('es-CO').format(price);
}

function loadCart(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw) as CartState;
  } catch {
    return { items: [] };
  }
}

function saveCart(state: CartState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or disabled
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ items: [] });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCart(loadCart());
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (hydrated) {
      saveCart(cart);
    }
  }, [cart, hydrated]);

  const addToCart = useCallback((product: Product) => {
    if (product.brand !== 'gudd') return;
    setCart(prev => {
      const existing = prev.items.find(i => i.product.id === product.id);
      if (existing) {
        return {
          items: prev.items.map(i =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...prev.items, { product, quantity: 1 }] };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => ({
      items: prev.items.filter(i => i.product.id !== productId),
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => ({
        items: prev.items.filter(i => i.product.id !== productId),
      }));
      return;
    }
    setCart(prev => ({
      items: prev.items.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [] });
  }, []);

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const subtotalFormatted = formatCOP(subtotal);

  const FREE_SHIPPING_THRESHOLD = 150000;
  const SHIPPING_FEE = 15000;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = subtotal > 0 ? SHIPPING_FEE : 0;
  const discount = isFreeShipping ? SHIPPING_FEE : 0;
  const total = subtotal + shipping - discount;

  const shippingFormatted = formatCOP(shipping);
  const discountFormatted = formatCOP(discount);
  const totalFormatted = formatCOP(total);

  return (
    <CartContext.Provider
      value={{
        items: cart.items,
        itemCount,
        subtotal,
        subtotalFormatted,
        shipping,
        shippingFormatted,
        discount,
        discountFormatted,
        total,
        totalFormatted,
        isFreeShipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
