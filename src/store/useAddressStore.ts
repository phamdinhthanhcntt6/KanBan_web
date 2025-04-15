import { persist } from "zustand/middleware";
import { AddressModel } from "@/models/AddressModel";
import { create } from "zustand";

type AddressStore = {
  defaultAddress: AddressModel;
  setAddressDefault: (address: AddressModel) => void;
};

const useAddressStore = create(
  persist<AddressStore>(
    (set) => ({
      defaultAddress: {
        address: "",
        _id: "",
        createdBy: "",
        name: "",
        pinCode: "",
        phone: "",
        isDefault: false,
      },
      setAddressDefault: (address) => set({ defaultAddress: address }),
    }),
    {
      name: "address-storage",
    }
  )
);

export default useAddressStore;
