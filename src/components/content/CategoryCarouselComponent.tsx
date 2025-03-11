import handleAPI from "@/apis/handleApi";
import { images } from "@/assets/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CategoryModel } from "@/models/CategoryModel";
import Image from "next/image";
import Link from "next/link";

const CategoryCarouselComponent = async () => {
  const api = `customer/get-categories`;
  const res = await handleAPI(api);
  const category =
    res.data && res.data.filter((item: any) => item.parentId === "");

  console.log(category);

  return (
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
                <Image alt="" src={images.image1} className="h-64 rounded-sm" />
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
  );
};

export default CategoryCarouselComponent;
