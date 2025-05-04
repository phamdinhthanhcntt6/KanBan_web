import { images } from "@/assets/image";
import CategoryCarouselComponent from "@/components/content/CategoryCarouselComponent";
import ProductListComponent from "@/components/content/ProductListComponent";
import TimeLeftComponent from "@/components/content/TimeLeftComponent";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { advantageData } from "@/data/advantageData";
import { commentData } from "@/data/commentData";
import { CommentModel } from "@/models/CommnetModel";
import { ArrowRight, Box, Card, Headphone, MoneyRecive } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const ContentComponent = () => {
  const iconAdvantages = {
    Box,
    MoneyRecive,
    Headphone,
    Card,
  };

  return (
    <div className="w-full gap-y-12 flex flex-col">
      <div className="max-w-7xl mx-auto py-6">
        <CategoryCarouselComponent />
        <div className={`max-w-7xl mx-auto pt-12 w-full flex flex-col px-12`}>
          <div className="text-center flex mx-auto text-2xl font-semibold mb-12 duration-200">
            Our Bestseller
          </div>
        </div>
        <ProductListComponent />
      </div>
      <div className="max-w-7xl mx-auto pt-12 w-full flex flex-row px-12 max-lg:px-6 gap-x-6 h-max max-lg:flex-col max-lg:gap-y-6">
        <div className="lg:w-1/2 h-max my-auto gap-y-8 flex flex-col">
          <div className="text-2xl font-semibold">Deals of the Month</div>
          <div className="text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ispum is that it has a more-or-less normal
            distrisbution of letters.
          </div>

          <TimeLeftComponent targetDate="23/06/2025" />

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
              {commentData.map((item: CommentModel) => (
                <CarouselItem
                  key={item.id}
                  className="lg:basis-1/3 max-lg:basis-1/2 max-md:basis-full cursor-pointer"
                >
                  <div className="w-full bg-white rounded-md flex flex-col p-6 boxShadow gap-y-4">
                    <div className="flex gap-x-[1px]">
                      {Array.from({ length: item.star }, (_, index) => (
                        <div key={index}>⭐</div>
                      ))}
                    </div>
                    <div>{item.comment}</div>
                    <div className="flex gap-x-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={`avatar${item.key}`}
                        />
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="font-bold">{item.name}</div>
                        <div className="font-light text-sm">{item.job}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 w-full flex flex-col px-12 max-lg:px-6 gap-y-6">
        <div className="flex mx-auto text-2xl font-semibold">
          Our Instagram Stories
        </div>
        <div className="flex justify-between mx-auto w-full max-lg:flex-col max-lg:items-center max-lg:gap-1 max-lg:grid max-lg:grid-cols-2">
          <Image alt="story" src={images.imageStory} />
          <Image alt="story" src={images.imageStory} />
          <Image alt="story" src={images.imageStory} />
          <Image alt="story" src={images.imageStory} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 w-full flex flex-row px-12 max-lg:px-6 gap-y-6 justify-between max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
        {advantageData.map((item: any) => {
          const IconComponent =
            iconAdvantages[item.icon as keyof typeof iconAdvantages];
          return (
            <div
              key={item.key}
              className="flex flex-col gap-y-2 max-lg:w-1/2 max-md:w-full"
            >
              <IconComponent size="32" />
              <div className="font-bold text-xl">{item.label}</div>
              <p>{item.decs}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentComponent;
