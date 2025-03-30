"use client";

import handleAPI from "@/apis/handleApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ProductModel } from "@/models/ProductModel";
import { SubProductModel } from "@/models/SubProductModel";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { Heart } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  product: ProductModel;
  subProduct: SubProductModel[];
}

const ProductItemComponent = (props: Props) => {
  const { product, subProduct } = props;

  const [colorSelected, setColorSelected] = useState<string>("");

  const [sizeSelected, setSizeSelected] = useState<string>("");

  const [quantitySelected, setQuantitySelected] = useState<number>(0);

  const [count, setCount] = useState<number>(1);

  const [priceSelected, setPriceSelected] = useState<number>(0);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { auth } = useAuthStore();

  const { cart, addCart } = useCartStore();

  useEffect(() => {
    const subProductSeleted = subProduct.find(
      (item) => item.color === colorSelected && item.size === sizeSelected
    );
    if (subProductSeleted) {
      setPriceSelected(subProductSeleted.price);
      setQuantitySelected(subProductSeleted.quantity);
    }
  }, [colorSelected, sizeSelected]);

  const rangePrice = subProduct.map((item: SubProductModel) => item.price);

  const uniqueColors = Array.from(
    new Set(subProduct.map((item: SubProductModel) => item.color))
  ) as string[];

  const uniqueSize = Array.from(
    new Set(subProduct.map((item: SubProductModel) => item.size))
  ) as string[];

  const availableSizesForColor = (color: string) => {
    return Array.from(
      new Set(
        subProduct
          .filter((item) => item.color === color)
          .map((item) => item.size)
      )
    );
  };

  const handleAddToCart = async () => {
    if (!auth.token) {
      setIsVisible(true);
      return;
    }

    if (!colorSelected || !sizeSelected) {
      toast.error("Choose color, size");
      return;
    }

    const subProductSelected = subProduct.find(
      (item) => item.color === colorSelected && item.size === sizeSelected
    );

    if (subProductSelected) {
      const values = {
        subProductId: subProductSelected._id,
        title: product.title,
        price: priceSelected,
        image: subProductSelected.images,
        size: sizeSelected,
        color: colorSelected,
        quantity: quantitySelected,
        createdBy: auth._id,
        count: count,
      };

      const index = cart.findIndex(
        (e: any) => e.productId === values.subProductId
      );

      if (index !== -1) {
      } else {
        const api = `/cart/create`;
        const res = await handleAPI(api, values, "post");
        addCart(res.data);
      }

      toast.success("Add to cart successfully!");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="font-bold text-primary text-xl">
        <span>
          $&nbsp;
          {priceSelected > 0
            ? priceSelected
            : `${Math.min(...rangePrice)} - ${Math.max(...rangePrice)}`}
        </span>
      </div>
      <p className="text-gray-600">{product?.description}</p>
      <div className="font-semibold mb-2">Color</div>
      <div className="flex gap-x-2">
        {uniqueColors.map((color: string) => (
          <div
            key={color}
            className={`w-10 h-10 rounded-md cursor-pointer ${
              colorSelected === color ? "ring-2 ring-black" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setColorSelected(color)}
          />
        ))}
      </div>
      <div className="font-semibold my-2">Size</div>
      <div className="flex gap-x-2">
        {uniqueSize.map((size: string) => {
          const isAvailable =
            !colorSelected ||
            availableSizesForColor(colorSelected).includes(size);
          return (
            <div
              key={size}
              className={`rounded-md text-sm w-12 py-3 font-bold text-center cursor-pointer
                ${
                  isAvailable
                    ? sizeSelected === size
                      ? "bg-black text-white"
                      : "bg-slate-200"
                    : "bg-slate-100 opacity-40 cursor-not-allowed"
                }`}
              onClick={() => isAvailable && setSizeSelected(size)}
            >
              {size}
            </div>
          );
        })}
      </div>
      <div className="text-slate-600">
        remaining {quantitySelected ?? 0} product(s)
      </div>
      <div className="flex gap-x-4 w-full max-md:flex-col max-md:gap-y-4">
        <div className="flex flex-row items-center border-slate-700 border-2 rounded-xl px-4 gap-x-6 w-1/4 max-md:w-max">
          <Button
            variant={"outline"}
            className="py-6 border-none shadow-none text-lg font-bold p-0 hover:bg-white"
            onClick={() => setCount(count - 1)}
            disabled={count <= 0 || !colorSelected || !sizeSelected}
          >
            -
          </Button>
          <div className="font-semibold text-lg flex-1 text-center">
            {count}
          </div>
          <Button
            variant={"outline"}
            className="py-6 border-none shadow-none text-lg font-bold p-0 hover:bg-white"
            onClick={() => setCount(count + 1)}
            disabled={
              count >= quantitySelected || !colorSelected || !sizeSelected
            }
          >
            +
          </Button>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-6 rounded-lg hover:bg-primary-dark"
        >
          Add to cart
        </Button>
        <Button className="bg-white py-6 hover:bg-white border-2 border-slate-700 shadow-none max-md:w-max">
          <Heart color="black" variant="Outline" />
        </Button>
      </div>
      <AlertDialog open={isVisible} onOpenChange={setIsVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You are currently not logged in. Would you like to be redirected
              to the login page?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Link href={`/login?name=${product.slug}&id=${product._id}`}>
                Continue
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductItemComponent;
