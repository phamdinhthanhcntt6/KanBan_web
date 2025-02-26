"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { truncated } from "../utils/truncatedText";
import { ArrowSwapHorizontal, Eye, Star1 } from "iconsax-react";

interface Props {
  title: string;
  src: string;
  id: string;
  description: string;
}

const ProductViewComponent = (props: Props) => {
  const { title, src, id, description } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
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
          className={`bg-slate-300 w-full h-72 ${isHover && "opacity-75"}`}
        />
        <div
          className={`${!isHover && "hidden"} absolute inset-0 flex flex-col`}
        >
          <div className="absolute top-0 right-0 pr-6 pt-6 flex flex-col gap-y-1">
            <div
              className="p-2 bg-white rounded-full cursor-pointer"
              onClick={() => {}}
            >
              <Star1 size="16" color="#555555" />
            </div>
            <div
              className="p-2 bg-white rounded-full cursor-pointer"
              onClick={() => {}}
            >
              <ArrowSwapHorizontal size="16" color="#555555" />
            </div>
            <div
              className="p-2 bg-white rounded-full cursor-pointer"
              onClick={() => {}}
            >
              <Eye size="16" color="#555555" />
            </div>
          </div>

          {/* Button "Add to cart" */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 py-2 bg-white text-center rounded-lg mb-4">
            <Link href={`/`}>Add to cart</Link>
          </div>
        </div>
      </div>

      <div className="text-start flex w-full flex-col">
        <div className="font-semibold">{title}</div>
        <div className="text-sm font-normal text-slate-600">
          {truncated(description, 30)}
        </div>
      </div>
    </div>
  );
};

export default ProductViewComponent;
