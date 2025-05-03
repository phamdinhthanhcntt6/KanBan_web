"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import handleAPI from "@/apis/handleApi";
import { replaceName } from "@/utils/replaceName";
import { truncated } from "@/utils/truncatedText";
import { Eye, Heart } from "iconsax-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

interface Props {
  title: string;
  src: string;
  id: string;
  description: string;
  price: number[];
}

const ProductViewComponent = (props: Props) => {
  const { title, src, id, description, price } = props;

  const { auth } = useAuthStore();

  const [isHover, setIsHover] = useState<boolean>(false);

  const handleAddWishList = async (id: string) => {
    const body = {
      productId: id,
      createdBy: auth._id,
    };

    try {
      const api = `/wishlist/create`;
      await handleAPI(api, body, "post");
      toast.success("Add to wishlist successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={`Key${id}`}
      className={`flex flex-col items-center mx-2 motion-translate-y-in-100`}
    >
      <div
        className={`w-full bg-[#FAFAFB] mx-auto flex items-center justify-center relative `}
        onClick={() => {}}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <Image
          src={src}
          alt={src}
          width={160}
          height={120}
          loading="lazy"
          quality={90}
          className={`bg-slate-300 w-full h-72 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:brightness-110 ${
            isHover ? "opacity-75" : ""
          }`}
        />

        <div
          className={`${!isHover && "hidden"} absolute inset-0 flex flex-col`}
        >
          <div className="absolute top-0 right-0 pr-6 pt-6 flex flex-col gap-y-1">
            <div
              className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-300"
              onClick={() => {
                handleAddWishList(id);
              }}
            >
              <Heart size="16" color="red" variant="Bold" />
            </div>
            <Link
              href={`/product/${replaceName(title)}/${id}`}
              className="p-2 bg-white rounded-full cursor-pointer hover:bg-slate-300"
            >
              <Eye size="16" color="#555555" />
            </Link>
          </div>
        </div>
      </div>

      <Link
        href={`/product/${replaceName(title)}/${id}`}
        className="text-start flex w-full flex-col cursor-pointer"
      >
        <div className="font-bold">{title}</div>
        <div className="text-sm font-normal text-slate-600">
          {truncated(description, 30)}
        </div>
        <div>
          {price.length > 0 && (
            <div className="flex">
              &#36;<div>{price[0]}</div>&nbsp;&#8722;&nbsp;
              <div>{price[1]}</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductViewComponent;
