import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductState {
  id: string;
  name: string;
  price: number;
  image: string[];
  color: string;
  size: string;
  quantity: number;
}

interface CartStore {
  cart: (ProductState & { quantity: number })[];
  addCart: (prod: ProductState) => void;
  removeCart: (prod: ProductState) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cart: [],
      addCart: (prod) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.id === prod.id &&
              item.color === prod.color &&
              item.size === prod.size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === prod.id &&
                item.color === prod.color &&
                item.size === prod.size
                  ? { ...item, quantity: item.quantity + prod.quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...prod }],
          };
        }),
      removeCart: (prod) => set((state) => ({})),
      clearCart: () => set({ cart: [] }),
      updateQuantity: (id, quantity) => set((state) => ({})),
    }),
    {
      name: "cart-storage",
    }
  )
);
