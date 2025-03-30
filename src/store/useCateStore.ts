import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CateState {
  _id: string;
  title: string;
  parentId: string;
  slug: string;
  description: string;
  createAt: string;
  updateAt: string;
  isDeleted: boolean;
  __v: number;
  key: string;
  children: any[];
}

interface CateStore {
  cate: CateState[];
  syncCate: (prod: CateState[]) => void;
}

export const useCateStore = create(
  persist<CateStore>(
    (set) => ({
      cate: [],
      syncCate: (items: CateState[]) => {
        set({ cate: items });
      },
    }),
    {
      name: "cate-store",
    }
  )
);
