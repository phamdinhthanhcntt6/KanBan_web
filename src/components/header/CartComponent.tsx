"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/store/useCartStore";
import { Bag2 } from "iconsax-react";

const CartComponent = () => {
  const { cart } = useCartStore();

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
      <DropdownMenuContent>
        <DropdownMenuLabel>
          You have {cart.length} item(s) in your cart
        </DropdownMenuLabel>
        {}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartComponent;
