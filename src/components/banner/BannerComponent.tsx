import handleAPI from "@/apis/handleApi";
import CarouselWrapperComponent from "@/components/banner/CarouselWrapperComponent";
import { Button } from "@/components/ui/button";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PromotionModel } from "@/models/PromotionModel";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const BannerComponent = async () => {
  const res = await handleAPI("/promotion");
  const promotion = res.data;

  return (
    <div className="px-4 max-w-7xl w-full mx-auto ">
      <CarouselWrapperComponent>
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
                  className="w-full border-2 rounded-md h-full aspect-video"
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
      </CarouselWrapperComponent>
    </div>
  );
};

export default BannerComponent;
