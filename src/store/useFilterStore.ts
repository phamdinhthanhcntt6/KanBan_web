import { create } from "zustand";

type FilterStore = {
  category: string;
  minPrice: number;
  maxPrice: number;
  color: string;
  size: string;
  setCategory: (category: string) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setColor: (color: string) => void;
  setSize: (size: string) => void;
};

const useFilterStore = create<FilterStore>()((set) => ({
  category: "",
  minPrice: 0,
  maxPrice: 0,
  color: "",
  size: "",
  setCategory: (category: string) => set(() => ({ category })),
  setMinPrice: (minPrice: number) => set(() => ({ minPrice })),
  setMaxPrice: (maxPrice: number) => set(() => ({ maxPrice })),
  setColor: (color: string) => set(() => ({ color })),
  setSize: (size: string) => set(() => ({ size })),
}));

export default useFilterStore;
