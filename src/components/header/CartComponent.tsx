"use client";

import handleAPI from "@/apis/handleApi";
import CartItemComponent from "@/components/header/CartItemComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartModel } from "@/models/CartModel";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { truncated } from "@/utils/truncatedText";
import { Bag2 } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartComponent = () => {
  const { cart, syncCart } = useCartStore();

  const { auth } = useAuthStore();

  const [total, setTotal] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCartByUid(auth._id);
  }, [auth]);

  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setTotal(totalAmount);
  }, [cart]);

  const getCartByUid = async (uid: string) => {
    setIsLoading(true);
    const api = `/cart?uid=${uid}`;
    try {
      const res = await handleAPI(api);

      const mergedCart = res.data.reduce((acc: any, item: CartModel) => {
        const key = `${item.createdBy}-${item.subProductId}-${item.color}-${item.size}`;
        if (!acc[key]) {
          acc[key] = { ...item };
        } else {
          acc[key].count += item.count;
        }
        return acc;
      }, {});
      syncCart(Object.values(mergedCart));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          {cart.length > 0 && (
            <div className="rounded-full bg-red-400 absolute -top-1 -right-1 p-1 flex items-center justify-center font-semibold" />
          )}
          <Bag2 size="24" className="cursor-pointer" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="gap-1 p-4 flex flex-col">
        {isLoading ? (
          <></>
        ) : (
          <>
            <DropdownMenuLabel className="mb-1">
              You have {cart.length} item(s) in your cart
            </DropdownMenuLabel>
            {cart.length > 0 &&
              cart.map((item: any) => (
                <CartItemComponent
                  subProductId={item.subProductId}
                  key={item._id}
                  id={item._id}
                  image={item.image[0]}
                  title={truncated(item.title, 24)}
                  price={item.price}
                  count={item.count}
                  color={item.color}
                  size={item.size}
                />
              ))}
            <DropdownMenuSeparator />
            <div className="flex flex-row justify-between font-bold">
              <div>Subtotal</div>
              <div>${total.toLocaleString()}</div>
            </div>
          </>
        )}
        <Button className="w-full" variant="outline">
          <Link href={"/cart"} className="w-full">
            View cart
          </Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartComponent;
