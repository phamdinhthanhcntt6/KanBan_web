"use client";

import handleAPI from "@/apis/handleApi";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { PromotionModel } from "@/models/PromotionModel";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BannerComponent = () => {
  const [promotion, setPromotion] = useState<PromotionModel[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPromotion();
  }, []);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const getPromotion = async () => {
    try {
      setIsLoading(true);
      const api = `/promotion`;
      const res = await handleAPI(api);
      setPromotion(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <></>;

  return (
    <div className="px-4 max-w-7xl w-full mx-auto ">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {promotion &&
            promotion.length > 0 &&
            promotion.map((promotion: PromotionModel) => (
              <CarouselItem
                key={promotion.id}
                className="relative w-full mx-auto rounded-md"
              >
                <Image
                  alt="banner"
                  src={promotion.images[0]}
                  className="w-full border-2 rounded-md h-full"
                  width={700}
                  height={400}
                />
                <div className="absolute top-1/3 max-lg:left-10 left-1/4 flex flex-col gap-y-2 max-lg:gap-y-1">
                  <div className="text-2xl max-lg:text-lg">
                    {promotion.title}
                  </div>
                  <div className="font-bold text-4xl max-lg:text-xl">
                    {promotion.description}
                  </div>
                  <div className="uppercase max-lg:text-sm">
                    Up to {promotion.value}% off
                  </div>
                  <Button className="w-max">
                    <Link
                      href={"/"}
                      className="flex flex-row items-center gap-x-2 p-2 text-sm max-lg:text-xs"
                    >
                      Shop Now <ArrowRight size={16} />
                    </Link>
                  </Button>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BannerComponent;
