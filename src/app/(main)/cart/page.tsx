import CartContent from "@/app/(main)/cart/components/CartContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = () => {
  return <CartContent />;
};

export default CartPage;
