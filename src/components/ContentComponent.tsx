"use client";

import { useEffect, useState } from "react";

import handleAPI from "@/apis/handleApi";
import { images } from "@/assets/image";
import ProductViewComponent from "@/components/ProductViewComponent";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryModel } from "@/models/CategoryModel";
import { ProductModel } from "@/models/ProductModel";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import TimeLeftComponent from "@/components/TimeLeftComponent";

const ContentComponent = () => {
  const [category, setCategory] = useState<CategoryModel[]>([]);

  const [products, setProducts] = useState<ProductModel[]>([]);

  const [page, _setPage] = useState<number>(1);

  const [pageSize, _setPageSize] = useState(8);

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {}, []);

  const getCategory = async () => {
    const api = `customer/get-categories`;
    const res = await handleAPI(api);

    const parentItems =
      res.data && res.data.filter((item: any) => item.parentId === "");
    parentItems && setCategory(parentItems);
  };

  const getProducts = async () => {
    const api = `customer/get-products?page=${page}&pageSize=${pageSize}`;
    const res = await handleAPI(api);
    res.data.items && setProducts(res.data.items);
  };

  return (
    <div className="w-full gap-y-12 flex flex-col">
      <div className="max-w-7xl mx-auto py-6">
        <Carousel className="px-12 max-lg:px-6">
          <div className="flex w-full justify-between items-center mb-4">
            <div className="text-2xl max-lg:text-xl font-semibold">
              Shop by Categories
            </div>
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
                  className="lg:basis-1/5 max-lg:basis-1/2 max-md:basis-full cursor-pointer"
                >
                  <Link
                    href={"/"}
                    className="flex flex-col items-center w-full rounded-sm h-64 relative"
                  >
                    <Image
                      alt=""
                      src={images.image1}
                      className="h-64 rounded-sm"
                    />
                    <div className="absolute bottom-4 max-lg:bottom-6 w-full px-6 max-lg:px-16">
                      <div className="bg-white text-xs rounded-lg w-full text-center align-bottom py-2 font-semibold z-10">
                        {item.title}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className={`max-w-7xl  mx-auto pt-12 w-full flex flex-col px-12`}>
        <div className="text-center flex mx-auto text-2xl font-semibold mb-12 duration-200">
          Our Bestseller
        </div>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
          {products &&
            products.map((item: ProductModel) => (
              <ProductViewComponent
                id={item._id}
                src={item.images[0]}
                key={item._id}
                title={item.title}
                description={item.description}
              />
            ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 w-full flex flex-row px-12 gap-x-6 h-max max-lg:flex-col max-lg:gap-y-6">
        <div className="lg:w-1/2 h-max my-auto gap-y-8 flex flex-col">
          <div className="text-2xl font-semibold">Deals of the Month</div>
          <div className="text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ispum is that it has a more-or-less normal
            distrisbution of letters.
          </div>

          <TimeLeftComponent target="23/06/2025" />

          <Link href={"/product"}>
            <Button>
              View All Product <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        <Image
          loading="lazy"
          src={images.deal}
          alt="deal"
          className="lg:w-1/2"
        />
      </div>
      <div className="bg-[#FAFAFB] w-full py-12">
        <div className="max-w-7xl mx-auto w-full">
          <Carousel className="px-12 max-lg:px-6">
            <div className="flex w-full justify-between items-center mb-4">
              <div className="text-2xl max-lg:text-xl font-semibold">
                What our Customer say?
              </div>
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
                    className="lg:basis-1/5 max-lg:basis-1/2 max-md:basis-full cursor-pointer"
                  >
                    <Link
                      href={"/"}
                      className="flex flex-col items-center w-full rounded-sm h-64 relative"
                    >
                      <Image
                        alt=""
                        src={images.image1}
                        className="h-64 rounded-sm"
                      />
                      <div className="absolute bottom-4 max-lg:bottom-6 w-full px-6 max-lg:px-16">
                        <div className="bg-white text-xs rounded-lg w-full text-center align-bottom py-2 font-semibold z-10">
                          {item.title}
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ContentComponent;
