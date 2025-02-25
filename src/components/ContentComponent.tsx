"use client";

import React, { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryModel } from "@/models/CategoryModel";
import handleAPI from "@/apis/handleApi";
import Link from "next/link";

const ContentComponent = () => {
  const [category, setCategory] = useState<CategoryModel[]>([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const api = `/category`;
    const res = await handleAPI(api);

    const parentItems =
      res.data && res.data.filter((item: any) => item.parentId === "");
    parentItems && setCategory(parentItems);
  };

  console.log(category);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-12 py-6">
        <Carousel>
          <div className="flex w-full justify-between items-center mb-4">
            <div className="text-2xl max-lg:text-xl">Shop by Categories</div>
            <div className="flex gap-x-1 relative mr-12">
              <CarouselPrevious className="rounded-lg hover:bg-black buttonCarousel" />
              <CarouselNext className="rounded-lg hover:bg-black buttonCarousel" />
            </div>
          </div>
          <CarouselContent>
            {category &&
              category.map((item: CategoryModel) => (
                <CarouselItem
                  key={item._id}
                  className="lg:basis-1/4 max-lg:basis-1/2 max-md:basis-full cursor-pointer"
                >
                  <Link
                    href={"/"}
                    className="flex flex-col items-center w-full bg-[#E8E8E8] p-4 px-6 rounded-lg h-64 justify-end"
                  >
                    <div className="bg-white rounded-lg w-full text-center py-2 font-semibold">
                      {item.title}
                    </div>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default ContentComponent;
