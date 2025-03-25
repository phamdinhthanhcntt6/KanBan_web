"use client";

import handleAPI from "@/apis/handleApi";
import ProgressComponent from "@/app/(main)/cart/components/ProgressComponent";
import LoadingComponent from "@/components/main/LoadingComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartModel } from "@/models/CartModel";
import { useCartStore } from "@/store/useCartStore";
import useStepStore from "@/store/useStepStore";
import { truncated } from "@/utils/truncatedText";
import { Bag, BagCross } from "iconsax-react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CartPage = () => {
  const { cart, updateQuantity, removeCart } = useCartStore();

  const { step, next, previous, isHydrated } = useStepStore();

  const [total, setTotal] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");

  const [dicount, setDicount] = useState<number>(0);

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    cart.length > 0 && setTotal(totalAmount);
  }, [cart]);

  const handleUpdateCountProductInCart = async (
    api: string,
    data: CartModel
  ) => {
    try {
      await handleAPI(api, data, "put");
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductInCart = async (id: string) => {
    try {
      removeCart(id);
      const api = `/cart/remove?id=${id}`;
      await handleAPI(api, undefined, "delete");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const checkCodePromotion = async (code: string) => {
    setIsLoading(true);
    try {
      const api = `/promotion/check?code=${code.toUpperCase()}`;
      const res = await handleAPI(api);
      res.data && setDicount(res.data.value);
      res.data && setMessage("");
    } catch (error) {
      setDicount(0);
      setMessage("Code is not valid");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const step0 = step === 0;

  const renderTitleStep = (step: number) => {
    switch (step) {
      case 1:
        return "Shipping Address";
      case 2:
        return "Payment Method";
      case 3:
        return "Review";
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl px-12 gap-y-4">
      <div className="px-2 text-2xl font-semibold">
        {!step0 ? (
          <div className="flex flex-row gap-x-4 items-center">
            <ArrowLeft
              size={24}
              onClick={() => previous()}
              className="cursor-pointer"
            />
            {renderTitleStep(step)}
          </div>
        ) : (
          "My Cart"
        )}
      </div>
      <div className="flex w-full gap-x-12">
        {step0 ? (
          !isHydrated ? (
            <LoadingComponent />
          ) : (
            <div className="w-2/3">
              <Table>
                <TableHeader>
                  <TableRow className="font-semibold">
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
                            disabled={product.count <= 0}
                            onClick={() => {
                              if (product.count > 0) {
                                product.count -= 1;
                                updateQuantity(
                                  product.subProductId,
                                  product.count
                                );
                                const api = `/cart/update-count?id=${product._id}`;
                                const data = {
                                  ...product,
                                  count: product.count,
                                };

                                if (updateTimeoutRef.current) {
                                  clearTimeout(updateTimeoutRef.current);
                                }

                                updateTimeoutRef.current = setTimeout(() => {
                                  handleUpdateCountProductInCart(api, data);
                                }, 1000);
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
                            disabled={product.count >= product.quantity}
                            onClick={() => {
                              product.count += 1;
                              updateQuantity(
                                product.subProductId,
                                product.count
                              );
                              const api = `/cart/update-count?id=${product._id}`;
                              const data = {
                                ...product,
                                count: product.count,
                              };

                              if (updateTimeoutRef.current) {
                                clearTimeout(updateTimeoutRef.current);
                              }

                              updateTimeoutRef.current = setTimeout(() => {
                                handleUpdateCountProductInCart(api, data);
                              }, 1000);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>{product.price * product.count}</TableCell>
                      <TableCell>
                        <Bag
                          onClick={() => removeProductInCart(product._id)}
                          size={16}
                          color="red"
                          className="h-max cursor-pointer active:bg-red-300"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center w-full mt-2">
                {cart.length === 0 && (
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      Currently, there are no products in the cart.
                    </div>
                    <div className="flex justify-center">
                      <BagCross size={80} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="w-2/3 px-2 mt-2">
            <ProgressComponent />
          </div>
        )}
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-row w-full justify-between">
                <div>Subtotal</div>
                <div>${total}</div>
              </CardTitle>
              <div className="w-full h-[1px] bg-slate-200"></div>
            </CardHeader>

            <CardContent className="gap-y-2 flex flex-col">
              <div className="text-sm">Enter Discount Code</div>
              <div className="flex w-full max-w-sm items-center">
                <Input
                  className="rounded-none rounded-tl-lg rounded-bl-lg focus-visible:ring-0 uppercase"
                  type="text"
                  placeholder="Code"
                  onChange={(values) => {
                    setCode(values.target.value);
                  }}
                />
                <Button
                  disabled={isLoading || code === ""}
                  onClick={() => checkCodePromotion(code)}
                  type="submit"
                  className="rounded-none rounded-tr-lg rounded-br-lg"
                >
                  Apply
                </Button>
              </div>
              {dicount > 0 && message === "" ? (
                <div className="text-sm w-full flex justify-between">
                  <div>Discount</div>
                  <div>- ${Math.floor((dicount / 100) * total)}</div>
                </div>
              ) : (
                <div className="text-sm text-red-600">{message}</div>
              )}
              <div className="text-sm w-full flex justify-between">
                <div>Delivery Charge</div>
                <div>$5</div>
              </div>
              <div className="w-full h-[1px] bg-slate-200"></div>
              <div className="text-sm w-full flex justify-between font-bold">
                <div>Grand Total</div>
                <div>${total + 5 - Math.ceil((dicount / 100) * total)}</div>
              </div>
            </CardContent>
            <CardFooter className={`${!step0 && "hidden"}`}>
              <Button className="w-full" onClick={() => next()}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
