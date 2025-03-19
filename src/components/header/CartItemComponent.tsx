"use client";

import handleAPI from "@/apis/handleApi";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Bag } from "iconsax-react";
import Image from "next/image";

interface Props {
  id: string;
  image: string;
  title: string;
  count: number;
  price: number;
  size: string;
  color: string;
  subProductId: string;
}

const CartItemComponent = (props: Props) => {
  const { id, image, title, count, color, size, price, subProductId } = props;

  const { removeCart } = useCartStore();

  const removeProductInCart = async (id: string) => {
    try {
      removeCart(id);
      const api = `/cart/remove?id=${id}`;
      await handleAPI(api, undefined, "delete");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-1 w-full justify-between" key={id}>
      <div className="flex gap-x-4">
        <Image
          src={image}
          alt=""
          width={40}
          height={30}
          className="w-16 h-16"
        />
        <div className="flex flex-col justify-between h-16 text-sm">
          <div>{title}</div>
          <div className="font-bold">
            {count} x $ {price}
          </div>
          <div className="w-full flex gap-x-4">
            <div className="w-16">Size: {size}</div>
            <div className="flex gap-x-2 items-center">
              Color:
              <div
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: color,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        variant={"ghost"}
        className="flex text-xs p-1 hover:bg-white active:bg-red-300 h-max"
        onClick={() => removeProductInCart(subProductId)}
      >
        <Bag
          size={16}
          color="red"
          className="h-max cursor-pointer active:bg-red-300"
        />
      </Button>
    </div>
  );
};

export default CartItemComponent;
