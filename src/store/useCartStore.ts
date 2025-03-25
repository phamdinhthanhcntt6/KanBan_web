import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductState {
  _id: string;
  subProductId: string;
  createdBy: string;
  name: string;
  price: number;
  image: string[];
  color: string;
  size: string;
  count: number;
  title: string;
}

interface CartStore {
  cart: ProductState[];
  addCart: (prod: ProductState) => void;
  removeCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  syncCart: (prod: ProductState[]) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      addCart: (prod: ProductState) => {
        const { cart } = get();
        const index = cart.findIndex(
          (e) => e.subProductId === prod.subProductId
        );

        if (index !== -1) {
          const upData = [...cart];
          upData[index].count += prod.count;
          set({ cart: upData });
        } else {
          set({ cart: [...cart, prod] });
        }
      },
      removeCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      clearCart: () => {
        set({ cart: [] });
      },
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.subProductId === id ? { ...item, count: quantity } : item
          ),
        }));
      },
      syncCart: (items: ProductState[]) => {
        set({ cart: items });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
