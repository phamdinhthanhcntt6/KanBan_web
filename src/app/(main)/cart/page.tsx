"use client";

import { useCartStore } from "@/store/useCartStore";
import React from "react";

const CartPage = () => {
  const { cart: items } = useCartStore();

  console.log(items);

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 ? <div>null</div> : <div>yes</div>}
    </div>
  );
};

export default CartPage;
