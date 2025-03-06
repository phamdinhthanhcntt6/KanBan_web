import { images } from "@/assets/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const BannerComponent = () => {
  return (
    <div className="px-12">
      <div className="relative max-w-7xl mx-auto p-4 rounded-md border-2">
        <Image alt="banner" src={images.banner} className="w-full" />
        <div className="md:absolute top-1/3 max-lg:left-10 left-1/4 flex flex-col gap-y-2">
          <div className="text-2xl font-semibold">Classic Exclusive</div>
          <div className="font-bold text-4xl">Women's Collection</div>
          <div className="uppercase">Up to 40% off</div>
          <Button className="w-max">
            <Link href={"/"} className="flex flex-row items-center gap-x-2">
              Shop Now <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
