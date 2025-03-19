"use client";

import handleAPI from "@/apis/handleApi";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCartStore } from "@/store/useCartStore";
import { truncated } from "@/utils/truncatedText";
import { Bag } from "iconsax-react";
import Image from "next/image";

const CartPage = () => {
  const { cart, updateQuantity } = useCartStore();

  return (
    <div className="flex w-full gap-4 max-w-7xl px-12 gap-x-4">
      <div className="w-2/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((product: any) => (
              <TableRow key={product._id}>
                <TableCell className="flex gap-x-1">
                  <Image
                    alt="img"
                    src={product.image[0]}
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col justify-between p-1">
                    <div className="font-bold">
                      {truncated(product.title, 40)}
                    </div>
                    <div className="w-full flex gap-x-4 text-xs">
                      <div className="w-16">Size: {product.size}</div>
                      <div className="flex gap-x-2 items-center">
                        Color:
                        <div
                          className="w-3 h-3 rounded-sm"
                          style={{
                            backgroundColor: product.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <div className="flex flex-row items-center border-slate-700 border-2 rounded-xl px-4 gap-x-6 w-40">
                    <Button
                      variant={"outline"}
                      className="py-6 border-none shadow-none text-lg font-bold p-0 hover:bg-white"
                      disabled={false}
                      onClick={async () => {
                        if (product.count > 0) {
                          product.count -= 1;
                          updateQuantity(product.subProductId, product.count);
                          const api = `/cart/update-count?id=${product._id}`;
                          const data = {
                            ...product,
                            count: product.count,
                          };
                          console.log(data);
                          try {
                            await handleAPI(api, data, "put");
                          } catch (error) {
                            console.log(error);
                          }
                        }
                      }}
                    >
                      -
                    </Button>
                    <div className="font-semibold text-lg flex-1 text-center">
                      {product.count}
                    </div>
                    <Button
                      variant={"outline"}
                      className="py-6 border-none shadow-none text-lg font-bold p-0 hover:bg-white"
                      disabled={false}
                      onClick={async () => {
                        product.count += 1;
                        updateQuantity(product.subProductId, product.count);
                        const api = `/cart/update-count?id=${product._id}`;
                        const data = {
                          ...product,
                          count: product.count,
                        };
                        try {
                          await handleAPI(api, data, "put");
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{product.price * product.count}</TableCell>
                <TableCell>
                  <Bag
                    onClick={() => console.log(product.subProductId)}
                    size={16}
                    color="red"
                    className="h-max cursor-pointer active:bg-red-300"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-1/3 bg-red-300">a</div>
    </div>
  );
};

export default CartPage;
